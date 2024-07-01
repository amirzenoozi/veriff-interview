import { Controller, Post, Body } from '@nestjs/common';
import { ResponseService } from './response.service';
import { Response } from './response.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @ApiTags('response')
  @Post('/')
  async submitResponse(
    @Body('verificationUuid') verificationUuid: string,
    @Body('results') results: any[],
    @Body('surveyConnection') surveyConnection: string,
  ): Promise<Response> {
    return await this.responseService.submitResponse(
      verificationUuid,
      results,
      surveyConnection,
    );
  }
}
