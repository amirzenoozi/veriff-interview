import {
	ArrayMinSize,
	ArrayNotEmpty,
	IsArray,
	IsNotEmpty,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResponseDto {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	verificationUuid: string;

	@ArrayNotEmpty()
	@ArrayMinSize(1)
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => ResultsDto)
	results: ResultsDto[];
}

export class ResultsDto {
	@IsNotEmpty()
	@IsString()
	checkId: string;

	@IsNotEmpty()
	@IsString()
	result: number;
}
