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
  completed?: boolean;

  ngOnInit() {
    this._completed = this.completed;
  }

  @Output()
  public onComplete: EventEmitter<boolean> = new EventEmitter();

  toggleCompleted(value: boolean) {
    this._completed = value;
    this.onComplete.emit(value);
  }

  @Output()
  public onDelete: EventEmitter<boolean> = new EventEmitter();

  handleDelete() {
    this.onDelete.emit();
  }
}
