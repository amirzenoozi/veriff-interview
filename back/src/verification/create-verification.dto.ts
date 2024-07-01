import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVerificationDto {
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => QuestionDto)
	questions: QuestionDto[];
}

export class QuestionDto {
	@IsNotEmpty()
	@IsString()
	id: string;

	@IsNotEmpty()
	@IsNumber()
	priority: number;

	@IsNotEmpty()
	@IsString()
	description: string;
}
