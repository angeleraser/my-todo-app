import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public _completed?: boolean;

  @Input()
  readonly?: boolean;

  @Input()
  name?: string;

  @Input()
  time?: string;

  @Input()
  identifier?: string;

  @Input()
  completed?: boolean;

  ngOnInit() {
    this._completed = this.completed;
  }

  @Output()
  public onUpdate: EventEmitter<{ completed: boolean; id: string }> =
    new EventEmitter();

  toggleCompleted(value: boolean) {
    this._completed = value;

    this.onUpdate.emit({
      completed: this._completed,
      id: this.identifier as string,
    });
  }

  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter();

  handleDelete(identifier?: string) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (!identifier || !confirmDelete) return;
    
    this.onDelete.emit(identifier);
  }
}
