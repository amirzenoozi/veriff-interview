import { Test, TestingModule } from '@nestjs/testing';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './create-response.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Response } from './response.interface';
import { v4 as uuidv4 } from 'uuid';

describe('ResponseController', () => {
	let responseController: ResponseController;
	let responseService: ResponseService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ResponseController],
			providers: [
				{
					provide: ResponseService,
					useValue: {
						createResponse: jest.fn(),
					},
				},
			],
		}).compile();

		responseController = module.get<ResponseController>(ResponseController);
		responseService = module.get<ResponseService>(ResponseService);
	});

	describe('createResponse', () => {
		it('should create a new response and return it', async () => {
			const uuid = uuidv4();
			const createResponseDto: CreateResponseDto = {
				verificationUuid: uuid,
				results: [
					{ checkId: 'aaa', result: 'yes' },
					{ checkId: 'bbb', result: 'no' },
				],
			};

			const response: Response = {
				uuid: uuidv4(),
				verificationUuid: uuid,
				created_at: new Date(),
				deleted_at: null,
				results: createResponseDto.results,
			};

			jest.spyOn(responseService, 'createResponse').mockResolvedValue(response);

			expect(await responseController.createResponse(createResponseDto)).toBe(response);
		});

		it('should throw a BadRequestException if the service throws an error', async () => {
			const createResponseDto: CreateResponseDto = {
				verificationUuid: uuidv4(),
				results: [
					{ checkId: 'aaa', result: 'yes' },
					{ checkId: 'bbb', result: 'no' },
				],
			};

			const error = new Error('Some error');
			jest.spyOn(responseService, 'createResponse').mockRejectedValue(error);

			await expect(responseController.createResponse(createResponseDto)).rejects.toThrow(BadRequestException);
		});

		it('should throw a NotFoundException if the verification UUID is not found', async () => {
			const createResponseDto: CreateResponseDto = {
				verificationUuid: uuidv4(),
				results: [
					{ checkId: 'aaa', result: 'yes' },
					{ checkId: 'bbb', result: 'no' },
				],
			};

			const error = new NotFoundException('Verification UUID not found');
			jest.spyOn(responseService, 'createResponse').mockRejectedValue(error);

			await expect(responseController.createResponse(createResponseDto)).rejects.toThrow(NotFoundException);
		});

		it('should throw a BadRequestException if there are more than the allowed number of "no" results', async () => {
			const createResponseDto: CreateResponseDto = {
				verificationUuid: uuidv4(),
				results: [
					{ checkId: 'aaa', result: 'no' },
					{ checkId: 'bbb', result: 'no' },
				],
			};

			const error = new Error('No More than 1 "no" result is allowed: 2 found.');
			jest.spyOn(responseService, 'createResponse').mockRejectedValue(error);

			await expect(responseController.createResponse(createResponseDto)).rejects.toThrow(BadRequestException);
		});
	});
});

