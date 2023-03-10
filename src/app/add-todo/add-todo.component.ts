import { Component, EventEmitter, Output } from '@angular/core';
import { TodoFormData } from '../add-todo-form/add-todo-form.component';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent {
  public showModal: boolean = false;

  @Output()
  public onSubmit: EventEmitter<TodoFormData> = new EventEmitter();

  public handleToggleModal() {
    this.showModal = !this.showModal;
    document.body.style.overflow = this.showModal ? 'hidden' : 'auto';
  }

  public handleSubmit(payload: TodoFormData) {
    this.onSubmit.emit({
      name: payload.name,
      time: payload.time,
      today: payload.today,
    });

    this.handleToggleModal();
  }
}
