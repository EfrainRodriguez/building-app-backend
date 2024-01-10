import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Applicant, ApplicantSchema } from './schemas/applicant.schema';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Applicant.name, schema: ApplicantSchema }
    ])
  ],
  providers: [ApplicantService],
  controllers: [ApplicantController]
})
export class ApplicantModule {}
