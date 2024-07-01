import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResponseDto {
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => ResultsDto)
	questions: ResultsDto[];

	@IsNotEmpty()
	@IsString()
    @IsUUID()
	verificationUuid: string;
}

export class ResultsDto {
	@IsNotEmpty()
	@IsString()
	checkId: string;

	@IsNotEmpty()
	@IsString()
	result: number;

}
