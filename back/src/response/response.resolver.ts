import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ResponseService } from './response.service';
import { Response } from './response.model';
import { Verification } from '../verification/verification.model';
import { VerificationService } from '../verification/verification.service';

@Resolver(of => Response)
export class ResponseResolver {
	constructor(
		private responseService: ResponseService,
		private verificationService: VerificationService
	) {}

	@Query(returns => [Response])
	async getResponses() {
		return this.responseService.findAll();
	}

	@ResolveField(() => Verification)
	async verification(@Parent() response: Response): Promise<Verification> {
		const { verificationUuid } = response;
		return this.verificationService.getVerification(verificationUuid);
	}
}
