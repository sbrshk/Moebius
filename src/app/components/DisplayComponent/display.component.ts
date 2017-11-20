import { Component, OnInit } from '@angular/core';
import { Matrix } from '../../Matrix/Matrix';
import { Model } from '../../Model/Model';
import { Shapes } from '../../Shapes/Shapes';
import { Plotter } from '../../Plotter/Plotter';
import { AffineTransform } from '../../AffineTransform/AffineTransform';

@Component({
    selector: 'display-component',
    templateUrl: 'display.component.html',
    styleUrls: ['display.component.css']
})

export class DisplayComponent implements OnInit {
    private plotter: Plotter;
    private shapes: Shapes;
    private canvas: HTMLCanvasElement;
    private currentModel: Model;

    constructor() {
        this.shapes = new Shapes();
    }

    ngOnInit() {
        let _index = parseInt(document.cookie[document.cookie.length - 1], 10);

        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.plotter = new Plotter(this.canvas);
        this.currentModel = this.shapes.getShape(_index);
        this.plotter.drawAxis();
        this.plotter.drawModel(this.currentModel);
    }

    public applyTransform(transformMatrix: Matrix, model: Model): Model | any {
        let _model = new Model(model.getVerticesCount(), model.getEdgesCount());
        let _matrix = new Matrix(3, model.getVerticesCount());
        _matrix = Matrix.MatrixMatrixMultiply(transformMatrix, model.getVertices());
        _model.setVertices(_matrix);
        _model.setEdges(model.getEdges());

        return _model;
    }

    public onKeyPressed(code: number | any): void {
        console.log(code);
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
        let _currentModel: Model = this.currentModel;
        let _transformedModel = new Model(_currentModel.getVerticesCount(), _currentModel.getEdgesCount());
        _transformedModel.setEdges(_currentModel.getEdges());
        _transformedModel.setVertices(this.applyTransform(_transformMatrix, _currentModel).getVertices());
        // console.log(_transformedModel.getVertices().cells);
        this.plotter.drawAxis();
        this.plotter.drawModel(_transformedModel);
        this.currentModel = _transformedModel;
    }
    public onMouseWheel(delta: number | any): void {
        console.log(delta);
    }

    public reset(): void {
        let _index = parseInt(document.cookie[document.cookie.length - 1], 10);
        this.currentModel = this.shapes.getShape(_index);
        this.plotter.drawAxis();
        this.plotter.drawModel(this.currentModel);
    }
}
