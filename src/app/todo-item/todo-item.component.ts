import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
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

  public ngOnInit() {
    this._completed = this.completed;
  }

  @Output()
  public onUpdate: EventEmitter<{ completed: boolean; id: string }> =
    new EventEmitter();

  public toggleCompleted(value: boolean) {
    this._completed = value;

    this.onUpdate.emit({
      completed: this._completed,
      id: this.identifier as string,
    });
  }

  @Output()
  public onDelete: EventEmitter<string> = new EventEmitter();

  public handleDelete(identifier?: string) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (!identifier || !confirmDelete) return;
    
    this.onDelete.emit(identifier);
  }
}
