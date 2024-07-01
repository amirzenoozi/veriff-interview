import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Verification } from './verification.interface';
import { CreateVerificationDto } from './create-verification.dto';

@Injectable()
export class VerificationService {
  constructor(
    @InjectModel('Verification')
    private readonly verificationModel: Model<Verification>,
  ) {}

  async createVerification(
    createVerificationDto: CreateVerificationDto,
  ): Promise<Verification> {
    const { questions } = createVerificationDto;

    if (questions.length === 0) {
      throw new BadRequestException('Questions array cannot be empty');
    }

    const createdVerification = new this.verificationModel({ questions });
    return await createdVerification.save();
  }

  async getVerification(uuid: string): Promise<Verification | null> {
    return await this.verificationModel
      .findOne({ uuid, deleted_at: null })
      .exec();
  }

  async softDeleteVerification(uuid: string): Promise<Verification | null> {
    const verification = await this.verificationModel
      .findOne({ uuid, deleted_at: null })
      .exec();
    if (!verification) {
      throw new NotFoundException('Verification not found');
    }

    verification.deleted_at = new Date();
    return await verification.save();
  }

  async getActiveVerifications(): Promise<Verification[]> {
    return await this.verificationModel.find({ deleted_at: null }).exec();
  }
}
