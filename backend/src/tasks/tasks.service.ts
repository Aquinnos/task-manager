import { Inject, Injectable } from '@nestjs/common';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

@Injectable()
export class TasksService {
  constructor(
    @Inject('DYNAMO_CLIENT') private readonly docClient: DynamoDBDocumentClient,
  ) {}

  async getTasks(): Promise<Task[]> {
    const result = await this.docClient.send(
      new ScanCommand({ TableName: process.env.DYNAMO_TABLE }),
    );
    return result.Items as Task[];
  }

  async createTask(title: string): Promise<Task> {
    const newTask: Task = {
      id: uuid(),
      title,
      done: false,
    };

    await this.docClient.send(
      new PutCommand({
        TableName: process.env.DYNAMO_TABLE,
        Item: newTask,
      }),
    );

    return newTask;
  }
}
