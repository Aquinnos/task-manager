import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { dynamoProvider } from '../aws/dynamodb.provider';

@Module({
  controllers: [TasksController],
  providers: [TasksService, dynamoProvider],
})
export class TasksModule {}
