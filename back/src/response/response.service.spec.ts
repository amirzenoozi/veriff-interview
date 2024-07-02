import { Test, TestingModule } from '@nestjs/testing';
import { ResponseService } from './response.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, Result } from './response.interface';
import { CreateResponseDto } from './create-response.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('ResponseService', () => {
	let responseService: ResponseService;
	let responseModel: Model<Response>;
	let verificationModel: Model<any>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ResponseService,
				{
					provide: getModelToken('Response'),
					useValue: {
						new: jest.fn().mockResolvedValue({}),
						constructor: jest.fn().mockResolvedValue({}),
						find: jest.fn().mockResolvedValue([]),
						findOne: jest.fn().mockResolvedValue(null),
						exec: jest.fn().mockResolvedValue(null),
						findOneAndUpdate: jest.fn().mockResolvedValue(null),
						findById: jest.fn().mockResolvedValue(null),
						save: jest.fn().mockResolvedValue({}),
					},
				},
				{
					provide: getModelToken('Verification'),
					useValue: {
						findOne: jest.fn().mockResolvedValue({}),
					},
				},
			],
		}).compile();

		responseService = module.get<ResponseService>(ResponseService);
		responseModel = module.get<Model<Response>>(getModelToken('Response'));
		verificationModel = module.get<Model<any>>(getModelToken('Verification'));
	});

	describe('createResponse', () => {
		it('should throw NotFoundException if verification UUID is not found', async () => {
			const createResponseDto: CreateResponseDto = {
				verificationUuid: uuidv4(),
				results: [
					{ checkId: 'aaa', result: 'yes' },
					{ checkId: 'bbb', result: 'no' },
				],
			};

			jest.spyOn(verificationModel, 'findOne').mockResolvedValue(null);

			await expect(responseService.createResponse(createResponseDto)).rejects.toThrow(NotFoundException);
		});

		it('should throw BadRequestException if more than allowed "no" results', async () => {
			const createResponseDto: CreateResponseDto = {
				verificationUuid: uuidv4(),
				results: [
					{ checkId: 'aaa', result: 'no' },
					{ checkId: 'bbb', result: 'no' },
				],
			};

			jest.spyOn(verificationModel, 'findOne').mockResolvedValue({});

			await expect(responseService.createResponse(createResponseDto)).rejects.toThrow(BadRequestException);
		});
	});
});
