import {
	Controller,
	Post,
	Get,
	Param,
	Body,
	NotFoundException,
	BadRequestException,
	Delete, Query,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { Verification } from './verification.interface';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateVerificationDto } from './create-verification.dto';

@Controller('verification')
export class VerificationController {
	constructor(private readonly verificationService: VerificationService) {
	}

	@ApiTags('verification')
	@Post('/')
	async createVerification(
		@Body() createVerificationDto: CreateVerificationDto,
	): Promise<Verification> {
		try {
			return await this.verificationService.createVerification(
				createVerificationDto,
			);
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw new BadRequestException(error.message);
			}
			throw error;
		}
	}

	@ApiTags('verification')
	@Get('/')
	@ApiQuery({name: 'page', required: false, type: Number, description: 'Page number', example: 1})
	@ApiQuery({name: 'limit', required: false, type: Number, description: 'Results per page', example: 10})
	@ApiQuery({name: 'order', required: false, enum: ['asc', 'desc'], description: 'Order of results', example: 'asc'})
	@ApiQuery({name: 'orderBy', required: false, type: String, description: 'Field to order by', example: 'created_at'})
	async getActiveVerifications(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 10,
		@Query('order') order: 'asc' | 'desc' = 'asc',
		@Query('orderBy') orderBy: string = 'created_at'
	): Promise<{ data: Verification[], meta: any }> {
		try {
			return await this.verificationService.getActiveVerifications(page, limit, order, orderBy);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	@ApiTags('verification')
	@Get('/:uuid')
	async getVerification(
		@Param('uuid') uuid: string,
	): Promise<Verification | null> {
		try {
			return await this.verificationService.getVerification(uuid);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}

	@ApiTags('verification')
	@Delete('/:uuid')
	async softDeleteVerification(
		@Param('uuid') uuid: string,
	): Promise<Verification | null> {
		try {
			return await this.verificationService.softDeleteVerification(uuid);
		} catch (error) {
			throw new NotFoundException(error.message);
		}
	}
}
