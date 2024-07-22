import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VerificationService } from './verification.service';
import { PaginatedVerifications, Verification } from './verification.model';

@Resolver(of => Verification)
export class VerificationResolver {
	constructor(private verificationService: VerificationService) {}

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
}
