import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>
  ) {}

  async createProject(project: Project): Promise<Project> {
    const createdProject = new this.projectModel(project);
    return createdProject.save();
  }

  async getProject(id: string): Promise<Project> {
    return this.projectModel.findById(id);
  }

  async getProjects(): Promise<Project[]> {
    return this.projectModel.find();
  }

  async updateProject(id: string, project: Project): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(id, project, { new: true });
  }

  async deleteProject(id: string): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id);
  }
}
