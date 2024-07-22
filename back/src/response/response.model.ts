import { Field, ObjectType } from '@nestjs/graphql';
import { Verification } from '../verification/verification.model';

@ObjectType()
export class Result {
	@Field()
	checkId: string;

	@Field()
	result: string;
}

@ObjectType()
export class Response {
	@Field()
	uuid: string;

	@Field()
	verificationUuid: string;

	@Field()
	created_at: Date;

	@Field({ nullable: true })
	deleted_at: Date;

	@Field(type => [Result])
	results: Result[];

	@Field(type => Verification, { nullable: true })
	verification?: Verification;
}
