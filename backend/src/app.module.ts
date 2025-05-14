import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { dynamoProvider } from './aws/dynamodb.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [dynamoProvider],
})
export class AppModule {}
