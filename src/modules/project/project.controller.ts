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

import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ResponseProjectDto } from './dtos/response-project.dto';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiOkResponse({ type: ResponseProjectDto })
  async createProject(
    @Body(new ValidationPipe()) createProjectDto: CreateProjectDto,
    @Res() res
  ) {
    const project = await this.projectService.createProject(createProjectDto);
    return res.status(HttpStatus.CREATED).json(project);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiOkResponse({ type: ResponseProjectDto, isArray: true })
  async getProjects(@Query() query: PaginationDto) {
    return this.projectService.getProjects(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  @ApiOkResponse({ type: ResponseProjectDto })
  async getProject(@Param('id') id: string) {
    return this.projectService.getProject(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project by id' })
  @ApiOkResponse({ type: ResponseProjectDto })
  async updateProject(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateProjectDto: UpdateProjectDto
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by id' })
  @ApiOkResponse({ type: ResponseProjectDto })
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
