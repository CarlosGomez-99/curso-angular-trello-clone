import { Component, Input } from '@angular/core';
import { COLORS, Colors } from '@models/colors.models';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html',
})
export class CardColorComponent {
  @Input() color: Colors = 'sky';

  mapColorToClass = COLORS;

  get colorClass() {
    const classes = this.mapColorToClass[this.color];
    return classes ? classes : {};
  }
}
