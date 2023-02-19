import { Component } from '@angular/core';
import { TodoFormData } from '../add-todo-form/add-todo-form.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  public showModal: boolean = false;
  constructor(private taskService: TodoService) {}

  handleToggleModal() {
    this.showModal = !this.showModal;
  }

  handleSubmit(payload: TodoFormData) {
    this.taskService.addTodo({
      name: payload.name,
      time: payload.time,
      isToday: payload.today,
    });

    this.handleToggleModal()
  }
}
