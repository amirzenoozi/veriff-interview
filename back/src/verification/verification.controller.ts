import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { VerificationService } from './verification.service';
import { Verification } from './verification.interface';
import { ApiTags } from '@nestjs/swagger';
import { CreateVerificationDto } from './create-verification.dto';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @ApiTags('verification')
  @Post('/')
  async createVerification(
    @Body() createVerificationDto: CreateVerificationDto,
  ): Promise<Verification> {
    try {
      return await this.verificationService.createVerification(
        createVerificationDto,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @ApiTags('verification')
  @Get('/')
  async getVerifications(): Promise<Verification[]> {
    return await this.verificationService.getActiveVerifications();
  }

  @ApiTags('verification')
  @Get('/:uuid')
  async getVerification(
    @Param('uuid') uuid: string,
  ): Promise<Verification | null> {
    try {
      return await this.verificationService.getVerification(uuid);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @ApiTags('verification')
  @Delete('/:uuid')
  async softDeleteVerification(
    @Param('uuid') uuid: string,
  ): Promise<Verification | null> {
    try {
      return await this.verificationService.softDeleteVerification(uuid);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
