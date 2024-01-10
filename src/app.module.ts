import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './modules/project/project.module';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ProjectModule,
    ApplicantModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      ignoreUndefined: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
