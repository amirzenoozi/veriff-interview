import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ResponseService } from './response.service';
import { Response } from './response.model';

@Resolver(of => Response)
export class ResponseResolver {
	constructor(private responseService: ResponseService) {}

	@Query(returns => [Response])
	async getResponses() {
		return this.responseService.findAll();
	}
}
