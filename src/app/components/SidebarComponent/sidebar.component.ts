import { Component } from '@angular/core';
import { AffineTransform } from '../../AffineTransform/AffineTransform';
import {  Matrix } from '../../Matrix/Matrix';
import { Model2d } from '../../Model/Model2d';
import { Shapes2d } from '../../Shapes/Shapes2d';

import { StateService } from '../state.service';

@Component({
    selector: 'sidebar-component',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
    public twoD: boolean;
    public model: Model2d;
    public selectedItem = -1;
    public selectedModel = 'Necker Cube';
    public help: boolean;
    public info: boolean;

    private shapes: Shapes2d;

    constructor (private state: StateService) {
        this.shapes = new Shapes2d();
        this.twoD = true;
        this.help = false;
        this.info = false;
    }

    public showHelp(): void {
        this.help = !this.help;
    }

    public showInfo(): void {
        this.info = !this.info;
    }

    public switch2d3d(state: boolean): void {
        this.twoD = state;
    }

    public initModel(_model: Model2d): void {
        this.model = new Model2d(_model.getVerticesCount(), _model.getEdgesCount());
        this.model = _model;
    }

    public selectItem(index: number): void {
        this.initModel(this.shapes.getShape(index));
        this.state.setSleectedItem(index);
        let _btns = document.getElementsByClassName('sidebar-btn') as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < _btns.length; i++) {
            _btns[i].style.backgroundColor = '';
        }
        this.selectedItem = index;
        _btns[index].style.backgroundColor = '#bbb';
        switch (index) {
            case 0: this.selectedModel = 'Necker Cube'; break;
            case 1: this.selectedModel = 'Penrose Tribar'; break;
            case 2: this.selectedModel = 'Triangle Spidron'; break;
            case 3: this.selectedModel = 'Unicursal Hexagram'; break;
        }
    }
}
