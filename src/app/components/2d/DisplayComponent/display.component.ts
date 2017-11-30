import { Component, OnInit } from '@angular/core';
import { Matrix } from '../../../Matrix/Matrix';
import { Model2d } from '../../../Model/Model2d';
import { Shapes2d } from '../../../Shapes/Shapes2d';
import { Plotter2d } from '../../../Plotter/Plotter2d';
import { AffineTransform } from '../../../AffineTransform/AffineTransform';

import { StateService } from '../../state.service';

@Component({
    selector: 'display-component',
    templateUrl: 'display.component.html',
    styleUrls: ['display.component.css']
})

export class DisplayComponent implements OnInit {
    private plotter: Plotter2d;
    private shapes: Shapes2d;
    private canvas: HTMLCanvasElement;
    private currentModel: Model2d;
    private modelSelected: boolean;
    private pivotSet: boolean;
    private pivot: number[];

    constructor(private state: StateService) {
        this.shapes = new Shapes2d();
        this.modelSelected = false;
        this.pivotSet = false;
    }

    ngOnInit() {
        this.state.stateUpdated.subscribe(value => {
            if (value !== -1) {
                this.modelSelected = true;
                let _index = this.state.getSelectedItem();
                this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
                this.plotter = new Plotter2d(this.canvas);
                this.currentModel = this.shapes.getShape(_index);
                this.plotter.drawAxis();
                this.plotter.drawModel(this.currentModel);
            }
        });
    }

    public applyTransform(transformMatrix: Matrix, model: Model2d): Model2d | any {
        let _model = new Model2d(model.getVerticesCount(), model.getEdgesCount());
        let _matrix = new Matrix(3, model.getVerticesCount());
        let _currentMatrix: Matrix = model.getVertices();
        let _pivotMatrix: Matrix;

        if (this.pivotSet) {
            _pivotMatrix = new Matrix(3, 3);
            _pivotMatrix.cells = [
                [1, 0, -this.pivot[0]],
                [0, 1, -this.pivot[1]],
                [0, 0, 1]
            ];

            _currentMatrix = Matrix.MatrixMatrixMultiply(_pivotMatrix, _currentMatrix);
        }

        _currentMatrix = Matrix.MatrixMatrixMultiply(transformMatrix, _currentMatrix);

        if (this.pivotSet) {
            _pivotMatrix.cells = [
                [1, 0, this.pivot[0]],
                [0, 1, this.pivot[1]],
                [0, 0, 1]
            ];

            _currentMatrix = Matrix.MatrixMatrixMultiply(_pivotMatrix, _currentMatrix);
        }

        _matrix = _currentMatrix;
        _model.setVertices(_matrix);
        _model.setEdges(model.getEdges());

        return _model;
    }

    public onKeyPressed(code: number | any): void {
        let _transformMatrix: Matrix;
        switch (code) {
            case 37: _transformMatrix = AffineTransform.translation(-0.1, 0); break;
            case 38: _transformMatrix = AffineTransform.translation(0, 0.1); break;
            case 39: _transformMatrix = AffineTransform.translation(0.1, 0); break;
            case 40: _transformMatrix = AffineTransform.translation(0, -0.1); break;
            case 65: _transformMatrix = AffineTransform.rotationAngle(0.1); break;
            case 68: _transformMatrix = AffineTransform.rotationAngle(-0.1); break;
            case 87: _transformMatrix = AffineTransform.reflectionX(); break;
            case 83: _transformMatrix = AffineTransform.reflectionY(); break;
            case 32: _transformMatrix = AffineTransform.reflectionCenter(); break;
            case 81: _transformMatrix = AffineTransform.scaling(0.9, 0.9); break;
            case 69: _transformMatrix = AffineTransform.scaling(1.1, 1.1); break;
            case 90: _transformMatrix = AffineTransform.scaling(1.1, 1); break;
            case 88: _transformMatrix = AffineTransform.scaling(1, 1.1); break;
            case 67: _transformMatrix = AffineTransform.scaling(0.9, 1); break;
            case 86: _transformMatrix = AffineTransform.scaling(1, 0.9); break;
            default: _transformMatrix = AffineTransform.identity(); break;
        }
        let _currentModel: Model2d = this.currentModel;
        let _transformedModel = new Model2d(_currentModel.getVerticesCount(), _currentModel.getEdgesCount());
        _transformedModel.setEdges(_currentModel.getEdges());
        _transformedModel.setVertices(this.applyTransform(_transformMatrix, _currentModel).getVertices());
        this.plotter.drawAxis();
        this.plotter.drawModel(_transformedModel);
        if (this.pivotSet) {
            let _xS = this.plotter.translateXCoord(this.pivot[0]);
            let _yS = this.plotter.translateYCoord(this.pivot[1]);
            this.plotter.drawPivot(_xS, _yS);
        }
        this.currentModel = _transformedModel;
    }

    public onClick(event: Event | any): void {
        let _rect = this.canvas.getBoundingClientRect();
        let _scaleX = this.canvas.width / _rect.width;
        let _scaleY = this.canvas.height / _rect.height;
        let _xCoord = Math.round((event.clientX - _rect.left) * _scaleX);
        let _yCoord = Math.round((event.clientY - _rect.top) * _scaleY);
        this.pivotSet = true;
        this.plotter.drawAxis();
        this.plotter.drawModel(this.currentModel);
        this.pivot = this.plotter.setPivot(_xCoord, _yCoord);
    }

    public reset(): void {
        let _index = this.state.getSelectedItem();
        this.currentModel = this.shapes.getShape(_index);
        this.plotter.drawAxis();
        this.plotter.drawModel(this.currentModel);
        this.pivotSet = false;
        this.pivot = null;
    }
}
