import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent {
  @Input()
  public label?: string;

  @Input()
  public type?: 'button' | 'submit' = 'button';

  @Input()
  public color?: 'transparent' | 'black';

  @Input()
  public fullWidth?: boolean;

  @Input()
  public rounded?: boolean;

  @Input()
  public disabled?: boolean;

  @Output()
  public onClick = new EventEmitter();

  public classNames() {
    const classes = {
      [`app-button--is-${this.color}`]: !!this.color,
      'app-button--is-full-width': this.fullWidth,
      'app-button--is-rounded': this.rounded,
      'app-button--is-disabled': this.disabled,
    };

    return classes;
  }
}
