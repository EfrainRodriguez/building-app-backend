import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './modules/project/project.module';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ProjectModule,
    ApplicantModule,
    UserModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      ignoreUndefined: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
