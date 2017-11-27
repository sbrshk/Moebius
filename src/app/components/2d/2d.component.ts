import { Component, Directive, ViewChild } from '@angular/core';
import { DisplayComponent } from './DisplayComponent/display.component';

@Component({
    selector: 'two-d-component',
    templateUrl: '2d.component.html'
})

export class TwoDComponent {
    @ViewChild(DisplayComponent) display: DisplayComponent;
}
