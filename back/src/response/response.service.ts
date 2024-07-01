import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from './response.interface';
import { CreateResponseDto } from './create-response.dto';
import { Verification } from '../verification/verification.interface';

@Injectable()
export class ResponseService {
	constructor(
		@InjectModel('Response') private readonly responseModel: Model<Response>,
		@InjectModel('Verification') private readonly verificationModel: Model<Verification>,
	) {}

	async createResponse(createResponseDto: CreateResponseDto): Promise<Response> {
		const { verificationUuid, results } = createResponseDto;
		const verification = await this.verificationModel.findOne({ uuid: verificationUuid, deleted_at: null });
		if (!verification) {
			throw new NotFoundException('Verification UUID not found');
		}

		// Check If all results checkId exist in verification questions or not
		const sortedQuestions = verification.questions.sort((a, b) => a.priority - b.priority);
		const questionIds = sortedQuestions.map((question) => question.id);
		const isAllCheckIdExist = questionIds.every((qid) => {
			return results.some((result) => result.checkId === qid);
		});

		throw new NotFoundException('Wrong!!');

		// const createdResponse = new this.responseModel({
		// 	verificationUuid: verificationUuid,
		// 	results: results,
		// });
		// return await createdResponse.save();
	}
}
