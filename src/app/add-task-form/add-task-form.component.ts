import { Component, EventEmitter, Output } from '@angular/core';

type TaskFormData = {
  name: string;
  time: string;
  today: boolean;
};

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss'],
})
export class AddTaskFormComponent {
  public name = '';
  public time = '';
  public today = false;

  @Output()
  submit: EventEmitter<TaskFormData> = new EventEmitter();

  handleSubmit() {
    const task = {
      name: this.name,
      time: this.time,
      today: this.today,
    };

    console.log(task)

    this.submit.emit(task)
  }
}
