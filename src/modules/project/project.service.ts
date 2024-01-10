import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ) {}

  async createProject(project: CreateProjectDto) {
    const createdProject = new this.projectModel(project);
    return createdProject.save();
  }

  async getProject(id: string) {
    return this.projectModel.findById(id);
  }

  async getProjects(query: PaginationDto) {
    const sort = query.order === 'asc' ? 1 : -1;
    const count = await this.projectModel.countDocuments();
    const projects = await this.projectModel
      .find()
      .sort({ [query.orderBy]: sort })
      .skip(query.page * query.limit)
      .limit(query.limit)
      .exec();
    return {
      count,
      data: projects,
      page: query.page,
      limit: query.limit
    };
  }

  async updateProject(id: string, project: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(id, project, { new: true });
  }

  async deleteProject(id: string) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
