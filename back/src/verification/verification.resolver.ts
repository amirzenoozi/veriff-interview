import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VerificationService } from './verification.service';
import {
	CreateQuestionInput,
	PaginatedVerifications,
	Verification
} from './verification.model';

@Resolver(of => Verification)
export class VerificationResolver {
	constructor(private verificationService: VerificationService) {}

	@Mutation(returns => Verification)
	async createVerification(
		@Args({ name: 'questions', type: () => [CreateQuestionInput] }) questions: CreateQuestionInput[],
	): Promise<Verification> {
		const rawData = JSON.stringify(questions, null, 2);
		const data = { questions: JSON.parse(rawData) };
		return await this.verificationService.createVerification(data);
	}

	@Query(returns => PaginatedVerifications)
	async getVerifications(
		@Args('page', { type: () => Int, defaultValue: 1 }) page: number,
		@Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
		@Args('orderBy', { type: () => String, defaultValue: 'created_at' }) orderBy: string,
		@Args('order', { type: () => String, defaultValue: 'desc' }) order: 'asc' | 'desc',
	): Promise<PaginatedVerifications> {
		const { data, meta } = await this.verificationService.getActiveVerifications(page, limit, order, orderBy);
		return { data, meta };
	}

	@Query(returns => Verification)
	async getVerification(
		@Args('uuid') uuid: string,
	): Promise<Verification> {
		return await this.verificationService.getVerification(uuid);
	}

	@Mutation(returns => Verification)
	async removerVerification(
		@Args('uuid') uuid: string,
	): Promise<Verification> {
		return await this.verificationService.softDeleteVerification(uuid);
	}
}
