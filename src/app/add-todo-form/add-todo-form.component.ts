import { Component, EventEmitter, Output } from '@angular/core';

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
  onSubmit: EventEmitter<TodoFormData> = new EventEmitter();

  public handleSubmit() {
    this.onSubmit.emit({
      name: this.name,
      time: this.time,
      today: this.today,
    });

    this.name = '';
    this.time = '';
    this.today = false;
  }

  public ngDoCheck() {
    const data = {
      name: this.name,
      time: this.time,
    };

    this.enableSubmit = Object.values(data).every((v) => v);
  }
}
