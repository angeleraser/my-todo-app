import { Injectable, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/core/domain/models/Todo';
import { LocalStorageTodoService } from 'src/core/services/LocalStorageTodo.service';

const service = new LocalStorageTodoService();

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  public async getAllTasks() {
    const todos = await service.getAll();
    const [today, tomorrow] = [
      service.filterTodayTodos(todos),
      service.filterTomorrowTodos(todos),
    ];

    return { today, tomorrow };
  }

  @Output() getTodayTasks: EventEmitter<Todo[]> = new EventEmitter();
  @Output() getTomorrowTasks: EventEmitter<Todo[]> = new EventEmitter();

  public async addTodo(params: {
    name: string;
    time: string;
    isToday: boolean;
  }) {
    await service.addTodo(params);
    this.handleGetAllTasks();
  }

  public async updateTodo(params: { id: string; completed: boolean }) {
    await service.updateTodo(params);
    this.handleGetAllTasks();
  }

  public async deleteTodo(params: { id: string }) {
    await service.deleteTodo({ id: params.id });
    this.handleGetAllTasks();
  }

  public async handleGetAllTasks() {
    const todos = await service.getAll();

    this.getTodayTasks.emit(service.filterTodayTodos(todos));
    this.getTomorrowTasks.emit(service.filterTomorrowTodos(todos));
  }
}
