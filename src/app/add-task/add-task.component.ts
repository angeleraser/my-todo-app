import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  public showModal: boolean = false;
  
  handleToggleModal() {
    this.showModal = !this.showModal
  }
}
