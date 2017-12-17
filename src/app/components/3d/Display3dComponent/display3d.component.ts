import { Component, OnInit } from '@angular/core';
import { Matrix } from '../../../Matrix/Matrix';
import { Model3d } from '../../../Model/Model3d';
import { Shapes3d } from '../../../Shapes/Shapes3d';
import { Camera3d } from '../../../Camera/Camera3d';
import { Plotter2d } from '../../../Plotter/Plotter2d';

import { StateService } from '../../state.service';

@Component({
    selector: 'display3d-component',
    templateUrl: 'display3d.component.html',
    styleUrls: ['../../../../assets/sass/components/display.sass']
})

export class Display3dComponent implements OnInit {
    private plotter: Plotter2d;
    private camera: Camera3d;
    private shapes: Shapes3d;
    private canvas: HTMLCanvasElement;
    private currentModel: Model3d;
    private modelSelected: boolean;

    constructor(private state: StateService) {
        this.shapes = new Shapes3d();
        this.modelSelected = false;
    }

    ngOnInit() {
        this.state.stateUpdated.subscribe(value => {
            if (value !== -1) {
                this.modelSelected = true;
                let _index = this.state.getSelectedItem();
                this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
                this.plotter = new Plotter2d(this.canvas);
                this.currentModel = this.shapes.getPolyhedron(_index);
            }
        });
    }
}
