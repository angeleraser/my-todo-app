import { Component, EventEmitter, Output, OnChanges } from '@angular/core';

export type TaskFormData = {
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
  public enableSubmit = false;

  @Output()
  onsubmit: EventEmitter<TaskFormData> = new EventEmitter();

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
