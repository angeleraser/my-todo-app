import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './app-switch.component.html',
  styleUrls: ['./app-switch.component.scss'],
})
export class AppSwitchComponent {
  public enabled: boolean;

  constructor() {
    this.enabled = false;
  }

  @Output()
  onchange: EventEmitter<boolean> = new EventEmitter()

  handleToggle() {
    this.enabled = !this.enabled;
    this.onchange.emit(this.enabled)
  }
}
