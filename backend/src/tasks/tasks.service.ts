import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string): Task {
    const newTask = { id: uuid(), title, done: false };
    this.tasks.push(newTask);
    return newTask;
  }
}
