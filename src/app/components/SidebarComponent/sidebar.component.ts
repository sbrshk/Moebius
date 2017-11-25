import { Component, OnInit } from '@angular/core';
import { AffineTransform } from '../../AffineTransform/AffineTransform';
import {  Matrix } from '../../Matrix/Matrix';
import { Model2d } from '../../Model/Model2d';
import { Shapes2d } from '../../Shapes/Shapes2d';

@Component({
    selector: 'sidebar-component',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public twoD: boolean;
    public model: Model2d;
    public selectedItem = -1;
    public selectedModel = 'Necker Cube';

    private shapes: Shapes2d;

    constructor () {
        this.shapes = new Shapes2d();
        this.twoD = true;
    }

    ngOnInit () {
        let _index = parseInt(document.cookie[document.cookie.length - 1], 10);
        if (!isNaN(_index)) {
            this.selectItem(_index);
        }
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
        document.cookie = 'item=' + index;
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
