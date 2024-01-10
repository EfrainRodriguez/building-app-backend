import {
  Get,
  Put,
  Res,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Controller,
  HttpStatus,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dtos/create-applicant.dto';
import { UpdateApplicantDto } from './dtos/update-applicant.dto';
import { ResponseApplicantDto } from './dtos/response-applicant.dto';

@Controller('applicant')
@ApiTags('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a applicant' })
  @ApiOkResponse({ type: ResponseApplicantDto })
  async createApplicant(
    @Body(new ValidationPipe()) createApplicantDto: CreateApplicantDto,
    @Res() res
  ) {
    const applicant = await this.applicantService.createApplicant(
      createApplicantDto
    );
    return res.status(HttpStatus.CREATED).json(applicant);
  }

  @Get()
  @ApiOperation({ summary: 'Get all applicants' })
  @ApiOkResponse({ type: ResponseApplicantDto, isArray: true })
  async getApplicants(@Query() query: PaginationDto) {
    return this.applicantService.getApplicants(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a applicant by id' })
  @ApiOkResponse({ type: ResponseApplicantDto })
  async getApplicant(@Param('id') id: string) {
    return this.applicantService.getApplicant(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a applicant by id' })
  @ApiOkResponse({ type: ResponseApplicantDto })
  async updateApplicant(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateApplicantDto: UpdateApplicantDto
  ) {
    return this.applicantService.updateApplicant(id, updateApplicantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a applicant by id' })
  @ApiOkResponse({ type: ResponseApplicantDto })
  async deleteApplicant(@Param('id') id: string) {
    return this.applicantService.deleteApplicant(id);
  }
}
