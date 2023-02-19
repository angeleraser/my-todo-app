import { Component, EventEmitter, Output, OnChanges } from '@angular/core';

export type TodoFormData = {
  name: string;
  time: string;
  today: boolean;
};

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss'],
})
export class AddTodoFormComponent {
  public name = '';
  public time = '';
  public today = false;
  public enableSubmit = false;

  @Output()
  onsubmit: EventEmitter<TodoFormData> = new EventEmitter();

  public handleSubmit() {
    const task = {
      name: this.name,
      time: this.time,
      today: this.today,
    };

    if (Object.values(task).some((v) => !v && typeof v !== 'boolean')) return;

    this.onsubmit.emit(task);
    this.name = '';
    this.time = '';
    this.today = false;
  }

  ngDoCheck() {
    const data = {
      name: this.name,
      time: this.time,
    };

    this.enableSubmit = Object.values(data).every((v) => v);
  }
}
