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
  public showHourErrorMsg = false;
  public minHour?: string;

  @Output()
  onSubmit: EventEmitter<TodoFormData> = new EventEmitter();

  public handleSubmit() {
    if (!this.enableSubmit) return;

    this.onSubmit.emit({
      name: this.name,
      time: this.time,
      today: this.today,
    });

    this.resetFormData()
  }

  public handleSetMinHour() {
    if (this.today) {
      const today = new Date();
      const minutes = today.getMinutes();
      const hours = today.getHours();

      this.minHour = `${hours < 12 ? '0' : ''}${hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;
    } else {
      this.minHour = '';
    }
  }

  public ngDoCheck() {
    const data = {
      name: this.name,
      time: this.time,
    };

    this.handleSetMinHour();

    const isValidHour = this.validateMinAndSelectedHour();

    this.enableSubmit = Object.values(data).every((v) => v) && isValidHour;
    this.showHourErrorMsg = !isValidHour;
  }

  private getAmPm(time?: string) {
    if (!time) return '';

    const [h] = time.split(':');
    if (Number(h) < 12) return 'AM';
    return 'PM';
  }

  public getFormatedTime(time?: string) {
    if (!time) return '';

    const [hr, mnt] = time.split(':');
    let h = Number(hr);

    if (h >= 12) h -= 12;
    if (h === 0) h = 12;

    const timeValue = `${h}:${mnt}`;

    return `${timeValue}:${this.getAmPm(time)}`;
  }

  public validateMinAndSelectedHour() {
    if (!this.minHour || !this.today) return true;

    const [minHours, minMinutes] = this.minHour.split(':');
    const [selectedHours, selectedMinutes] = this.time.split(':');

    return (
      Number(selectedHours) >= Number(minHours) &&
      Number(selectedMinutes) >= Number(minMinutes)
    );
  }

  private resetFormData() {
    this.name = '';
    this.time = '';
    this.today = false;
  }
}
