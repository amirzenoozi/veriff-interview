import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Response, Result } from './response.interface';
import { CreateResponseDto, ResultsDto } from './create-response.dto';
import { Verification } from '../verification/verification.interface';

@Injectable()
export class ResponseService {
	constructor(
		@InjectModel('Response') private readonly responseModel: Model<Response>,
		@InjectModel('Verification') private readonly verificationModel: Model<Verification>,
	) {}

	private readonly countNoResults = (checks: ResultsDto[]): number => {
		let count = 0;
		for (let check of checks) {
			if (check.result.toLowerCase() === "no") {
				count++;
			}
		}
		return count;
	}

	async createResponse(createResponseDto: CreateResponseDto): Promise<Response> {
		const { verificationUuid, results } = createResponseDto;
		const verification = await this.verificationModel.findOne({ uuid: verificationUuid, deleted_at: null });
		if (!verification) {
			throw new NotFoundException('Verification UUID not found');
		}

		// Check the number of "no" results
		const numberOfNoResults = this.countNoResults(results);
		const ALLOWED_NO_RESULTS: number = 1;
		if (numberOfNoResults > ALLOWED_NO_RESULTS) {
			throw new BadRequestException(`No More than ${ALLOWED_NO_RESULTS} "no" result is allowed: ${numberOfNoResults} found.`);
		}

		const createdResponse = new this.responseModel({
			verificationUuid: verificationUuid,
			results: results,
		});
		return await createdResponse.save();
	}
}
