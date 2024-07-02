import { Controller, Post, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Response } from './response.interface';
import { CreateResponseDto } from './create-response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('response')
export class ResponseController {
	constructor(private readonly responseService: ResponseService) {
	}

	@ApiTags('response')
	@Post('/')
	async createResponse(
		@Body() createResponseDto: CreateResponseDto,
	): Promise<Response> {
		try {
			return await this.responseService.createResponse(createResponseDto);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error;
			}
			throw new BadRequestException(error.message);
		}
	}
}
