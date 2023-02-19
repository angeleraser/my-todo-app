import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from 'src/core/domain/models/Todo';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public today: Todo[] = [];
  public tomorrow: Todo[] = [];

  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    const data = await this.taskService.getAllTasks();
    this.today = data.today;
    this.tomorrow = data.tomorrow;

    this.taskService.getTomorrowTasks.subscribe((todos) => {
      this.tomorrow = todos;
    });

    this.taskService.getTodayTasks.subscribe((todos) => {
      this.today = todos;
    });
  }

  public handleUpdateTask(payload: { id: string; completed: boolean }) {
    this.taskService.updateTodo(payload);
  }

  public handleDeleteTask(payload: { id: string; }) {
    this.taskService.deleteTodo(payload);
  }
}
