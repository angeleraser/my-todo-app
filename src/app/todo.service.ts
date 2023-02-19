import { Injectable, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/core/domain/models/Todo';
import { LocalStorageTodoService } from 'src/core/services/LocalStorageTodo.service';

const service = new LocalStorageTodoService();

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  public async getAllTodos() {
    const todos = await service.getAll();
    const [today, tomorrow] = [
      service.filterTodayTodos(todos),
      service.filterTomorrowTodos(todos),
    ];

    return { today, tomorrow };
  }

  @Output() getTodayTodos: EventEmitter<Todo[]> = new EventEmitter();
  @Output() getTomorrowTodos: EventEmitter<Todo[]> = new EventEmitter();

  public async addTodo(params: {
    name: string;
    time: string;
    isToday: boolean;
  }) {
    await service.addTodo(params);
    this.handleGetAllTodos();
  }

  public async updateTodo(params: { id: string; completed: boolean }) {
    await service.updateTodo(params);
    this.handleGetAllTodos();
  }

  public async deleteTodo(params: { id: string }) {
    await service.deleteTodo({ id: params.id });
    this.handleGetAllTodos();
  }

  private async handleGetAllTodos() {
    const todos = await service.getAll();

    this.getTodayTodos.emit(service.filterTodayTodos(todos));
    this.getTomorrowTodos.emit(service.filterTomorrowTodos(todos));
  }
}
