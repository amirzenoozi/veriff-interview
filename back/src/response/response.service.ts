import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from './response.interface';

@Injectable()
export class ResponseService {
	constructor(
		@InjectModel('Response') private readonly responseModel: Model<Response>,
	) {
	}

	async submitResponse(
		verificationUuid: string,
		results: any[],
	): Promise<Response> {
		const submittedResponse = new this.responseModel({
			verificationUuid,
			results,
		});
		return await submittedResponse.save();
	}
}
