import { Component, EventEmitter, Output, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './app-switch.component.html',
  styleUrls: ['./app-switch.component.scss'],
})
export class AppSwitchComponent implements OnInit, OnChanges {
  public enabled?: boolean = false;

  @Input()
  public value?: boolean;

  public ngOnInit() {
    this.enabled = this.value;
  }

  public ngOnChanges() {
    this.enabled = this.value;
  }

  @Output()
  onChange: EventEmitter<boolean> = new EventEmitter();

  public handleToggle() {
    this.enabled = !this.enabled;
    this.onChange.emit(this.enabled);
  }
}
