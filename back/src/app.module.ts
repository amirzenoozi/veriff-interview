import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseService } from './response/response.service';
import { VerificationSchema } from './verification/verification.schema';
import { ResponseSchema } from './response/response.schema';
import { VerificationController } from './verification/verification.controller';
import { VerificationService } from './verification/verification.service';
import { ResponseController } from './response/response.controller';
import { APP_PIPE } from '@nestjs/core';
import configuration from '../config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot(configuration().database.mongo.uri),
    MongooseModule.forFeature([
      { name: 'Verification', schema: VerificationSchema },
      { name: 'Response', schema: ResponseSchema },
    ]),
  ],
  controllers: [AppController, VerificationController, ResponseController],
  providers: [
    AppService,
    VerificationService,
    ResponseService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
