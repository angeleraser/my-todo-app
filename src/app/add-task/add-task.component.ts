import { Component } from '@angular/core';
import { TaskFormData } from '../add-task-form/add-task-form.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  public showModal: boolean = false;
  constructor(private taskService: TaskService) {}

  handleToggleModal() {
    this.showModal = !this.showModal;
  }

  handleSubmit(payload: TaskFormData) {
    this.taskService.addTodo({
      name: payload.name,
      time: payload.time,
      isToday: payload.today,
    });

    this.handleToggleModal()
  }
}
