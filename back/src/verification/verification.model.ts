import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class Question {
	@Field()
	id: string;

	@Field()
	priority: number;

	@Field()
	description: string;
}

@ObjectType()
export class Verification {
	@Field()
	uuid: string;

	@Field()
	created_at: Date;

	@Field({ nullable: true })
	deleted_at?: Date;

	@Field(type => [Question])
	questions: Question[];
}

@ObjectType()
export class PaginationMeta {
	@Field(type => Int)
	total_count: number;

	@Field(type => Int)
	total_pages: number;

	@Field(type => Int)
	current_page: number;

	@Field(type => Int)
	limit: number;

	@Field(type => String)
	order_by: number;

	@Field(type => String)
	order: number;
}

@ObjectType()
export class PaginatedVerifications {
	@Field(type => [Verification])
	data: Verification[];

	@Field(type => PaginationMeta)
	meta: PaginationMeta;
}

@InputType()
export class CreateQuestionInput {
	@Field()
	id: string;

	@Field()
	priority: number;

	@Field()
	description: string;
}
