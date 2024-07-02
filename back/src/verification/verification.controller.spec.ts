import { Test, TestingModule } from '@nestjs/testing';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './create-verification.dto';
import { Verification } from './verification.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('VerificationController', () => {
	let verificationController: VerificationController;
	let verificationService: VerificationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VerificationController],
			providers: [
				{
					provide: VerificationService,
					useValue: {
						createVerification: jest.fn(),
						getVerification: jest.fn(),
						softDeleteVerification: jest.fn(),
						getActiveVerifications: jest.fn(),
					},
				},
			],
		}).compile();

		verificationController = module.get<VerificationController>(VerificationController);
		verificationService = module.get<VerificationService>(VerificationService);
	});

	describe('createVerification', () => {
		it('should create a new verification and return it', async () => {
			const createVerificationDto: CreateVerificationDto = {
				questions: [
					{ id: 'aaa', priority: 10, description: 'Test question 1' },
				],
			};

			const verification: Verification = {
				uuid: uuidv4(),
				created_at: new Date(),
				deleted_at: null,
				questions: createVerificationDto.questions,
			};

			jest.spyOn(verificationService, 'createVerification').mockResolvedValue(verification);

			expect(await verificationController.createVerification(createVerificationDto)).toBe(verification);
		});

		it('should throw a BadRequestException if the service throws a BadRequestException', async () => {
			const createVerificationDto: CreateVerificationDto = {
				questions: [],
			};

			const error = new BadRequestException('Questions array cannot be empty');
			jest.spyOn(verificationService, 'createVerification').mockRejectedValue(error);

			await expect(verificationController.createVerification(createVerificationDto)).rejects.toThrow(BadRequestException);
		});
	});

	describe('getVerification', () => {
		it('should return a verification if found', async () => {
			const uuid = uuidv4();
			const verification: Verification = {
				uuid: uuid,
				created_at: new Date(),
				deleted_at: null,
				questions: [
					{ id: 'aaa', priority: 10, description: 'Test question 1' },
				],
			};

			jest.spyOn(verificationService, 'getVerification').mockResolvedValue(verification);

			expect(await verificationController.getVerification(uuid)).toBe(verification);
		});

		it('should throw a NotFoundException if the verification is not found', async () => {
			const uuid = 'some-uuid';
			const error = new NotFoundException('Verification not found');
			jest.spyOn(verificationService, 'getVerification').mockRejectedValue(error);

			await expect(verificationController.getVerification(uuid)).rejects.toThrow(NotFoundException);
		});
	});

	describe('softDeleteVerification', () => {
		it('should soft delete a verification and return it', async () => {
			const uuid = uuidv4();
			const verification: Verification = {
				uuid: uuid,
				created_at: new Date(),
				deleted_at: new Date(),
				questions: [
					{ id: 'aaa', priority: 10, description: 'Test question 1' },
				],
			};

			jest.spyOn(verificationService, 'softDeleteVerification').mockResolvedValue(verification);

			expect(await verificationController.softDeleteVerification(uuid)).toBe(verification);
		});

		it('should throw a NotFoundException if the verification is not found', async () => {
			const uuid = uuidv4();
			const error = new NotFoundException('Verification not found');
			jest.spyOn(verificationService, 'softDeleteVerification').mockRejectedValue(error);

			await expect(verificationController.softDeleteVerification(uuid)).rejects.toThrow(NotFoundException);
		});
	});

	describe('getActiveVerifications', () => {
		it('should return active verifications with pagination metadata', async () => {
			const page = 1;
			const limit = 10;
			const order = 'asc';
			const orderBy = 'created_at';

			const verifications: Verification[] = [
				{
					uuid: uuidv4(),
					created_at: new Date(),
					deleted_at: null,
					questions: [{ id: 'aaa', priority: 10, description: 'Test question 1' }],
				},
			];

			const meta = {
				total_count: 1,
				total_pages: 1,
				current_page: page,
				limit: limit,
				order_by: orderBy,
				order: order,
			};

			jest.spyOn(verificationService, 'getActiveVerifications').mockResolvedValue({ data: verifications, meta });

			expect(await verificationController.getActiveVerifications(page, limit, order, orderBy)).toEqual({
				data: verifications,
				meta,
			});
		});


		it('should return empty verifications when apply for unavailable page', async () => {
			const page = 5;
			const limit = 10;
			const order = 'asc';
			const orderBy = 'created_at';

			const verifications: Verification[] = [];

			const meta = {
				total_count: 1,
				total_pages: 1,
				current_page: page,
				limit: limit,
				order_by: orderBy,
				order: order,
			};

			jest.spyOn(verificationService, 'getActiveVerifications').mockResolvedValue({ data: verifications, meta });

			expect(await verificationController.getActiveVerifications(page, limit, order, orderBy)).toEqual({
				data: verifications,
				meta,
			});
		});

		it('should throw a BadRequestException if the service throws an error', async () => {
			const page = 1;
			const limit = 10;
			const order = 'asc';
			const orderBy = 'created_at';

			const error = new BadRequestException('An error occurred');
			jest.spyOn(verificationService, 'getActiveVerifications').mockRejectedValue(error);

			await expect(verificationController.getActiveVerifications(page, limit, order, orderBy)).rejects.toThrow(BadRequestException);
		});
	});
});
