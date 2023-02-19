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

  ngOnInit() {
    this.enabled = this.value;
  }

  ngOnChanges() {
    this.enabled = this.value;
  }

  @Output()
  onchange: EventEmitter<boolean> = new EventEmitter();

  handleToggle() {
    this.enabled = !this.enabled;
    this.onchange.emit(this.enabled);
  }
}
