import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Applicant } from './schemas/applicant.schema';
import { CreateApplicantDto } from './dtos/create-applicant.dto';
import { UpdateApplicantDto } from './dtos/update-applicant.dto';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectModel(Applicant.name) private applicantModel: Model<Applicant>
  ) {}

  async createApplicant(applicant: CreateApplicantDto) {
    const createdApplicant = new this.applicantModel(applicant);
    return createdApplicant.save();
  }

  async getApplicant(id: string) {
    return this.applicantModel.findById(id);
  }

  async getApplicants(query: PaginationDto) {
    const sort = query.order === 'asc' ? 1 : -1;
    const count = await this.applicantModel.countDocuments();
    const applicants = await this.applicantModel
      .find()
      .sort({ [query.orderBy]: sort })
      .skip(query.page * query.limit)
      .limit(query.limit)
      .exec();
    return {
      count,
      data: applicants,
      page: query.page,
      limit: query.limit
    };
  }

  async updateApplicant(id: string, applicant: UpdateApplicantDto) {
    return this.applicantModel.findByIdAndUpdate(id, applicant, { new: true });
  }

  async deleteApplicant(id: string) {
    return this.applicantModel.findByIdAndDelete(id);
  }
}
