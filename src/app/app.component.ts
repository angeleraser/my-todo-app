import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from 'src/core/domain/models/Todo';
import { TodoFormData } from './add-todo-form/add-todo-form.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public today: Todo[] = [];
  public tomorrow: Todo[] = [];

  constructor(private todoService: TodoService) {}

  public async ngOnInit() {
    const data = await this.todoService.getAllTodos();
    this.today = data.today;
    this.tomorrow = data.tomorrow;

    this.todoService.getTomorrowTodos.subscribe((todos) => {
      this.tomorrow = todos;
    });

    this.todoService.getTodayTodos.subscribe((todos) => {
      this.today = todos;
    });
  }

  public handleUpdateTask(payload: { id: string; completed: boolean }) {
    this.todoService.updateTodo(payload);
  }

  public handleDeleteTask(payload: { id: string }) {
    this.todoService.deleteTodo(payload);
  }

  public handleAddTodo(payload: TodoFormData) {
    this.todoService.addTodo({
      name: payload.name,
      time: payload.time,
      isToday: payload.today,
    });
  }
}
