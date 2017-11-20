import { Component, OnInit } from '@angular/core';
import { AffineTransform } from '../../AffineTransform/AffineTransform';
import {  Matrix } from '../../Matrix/Matrix';
import { Model } from '../../Model/Model';
import { Shapes } from '../../Shapes/Shapes';

@Component({
    selector: 'console-component',
    templateUrl: 'console.component.html',
    styleUrls: ['./console.component.css']
})

export class ConsoleComponent implements OnInit {
    public model: Model;
    public selectedItem: number = 1;
    public selectedModel: string = '';

    private shapes: Shapes;

    constructor () {
        this.shapes = new Shapes();
    }

    ngOnInit () {
        let _index = parseInt(document.cookie[document.cookie.length - 1], 10);
        this.selectItem(_index);
    }

    public initModel(_model: Model): void {
        this.model = new Model(_model.getVerticesCount(), _model.getEdgesCount());
        this.model = _model;
    }

    selectItem(index: number): void {
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
        }
    }
}
