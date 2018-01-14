import { Component, OnInit } from '@angular/core';
import { Matrix } from '../../../Matrix/Matrix';
import { Model2d } from '../../../Model/Model2d';
import { Model3d, WarframeModel } from '../../../Model/Model3d';
import { Shapes3d } from '../../../Shapes/Shapes3d';
import { Camera3d } from '../../../Camera/Camera3d';
import { Plotter2d } from '../../../Plotter/Plotter2d';
import { AffineTransform3d } from '../../../AffineTransform/AffineTransfrom3d';

import { StateService } from '../../state.service';
import { _ } from 'core-js/library/web/timers';

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
    private projectedModel: Model2d;
    private modelSelected: boolean;
    private transformed: boolean;

    constructor(private state: StateService) {
        this.shapes = new Shapes3d();
        this.modelSelected = false;
        this.transformed = false;
    }

    ngOnInit() {
        this.state.stateUpdated.subscribe(value => {
            if ((value !== -1) && (value > 3)) {
                this.modelSelected = true;
                this.transformed = false;
                let _index = this.state.getSelectedItem();
                this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
                this.plotter = new Plotter2d(this.canvas);
                this.camera = new Camera3d();
                this.currentModel = this.shapes.getPolyhedron(_index);
                this.projectedModel = this.translateModel(this.currentModel);
                this.plotter.clearCanvas();
                this.plotter.drawModel(this.projectedModel);
            }
        });
    }

    private translateModel(model: Model3d): Model2d | any {
        if (!this.transformed && this.modelSelected) {
            model.setWarframeModel(model.convertModel(model.getPolygonalModel()));
        }
        console.log('VERTICES 3d');
        console.log(model.getWarframeModel().getVertices().cells);
        console.log(' ');
        let model2d = new Model2d(model.getWarframeModel().getVerticesCount(), model.getWarframeModel().getEdgesCount());
        model2d.setEdges(model.getWarframeModel().getEdges());
        // let _translatedVertices = Matrix.MatrixMatrixMultiply(this.camera.translateVP(), model.getWarframeModel().getVertices());
        let _translatedVertices = this.camera.projectVertices(model.getWarframeModel().getVertices(), model.getWarframeModel().getVerticesCount());
        console.log('VERTICES 2d (world CS)');
        console.log(_translatedVertices.cells);
        model2d.setVertices(_translatedVertices);
        // console.log(model2d);
        return model2d;
    }

    public onResize(): void {
        if (this.modelSelected) {
            this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
            this.plotter = new Plotter2d(this.canvas);
            this.plotter.drawModel(this.projectedModel);
        }
    }

    public onKeyPressed(code: number | any): void {
        let _transformMatrix: Matrix;
        console.log(code);
        switch (code) {
            case 37: _transformMatrix = AffineTransform3d.translation(-0.1, 0, 0); break;
            case 38: _transformMatrix = AffineTransform3d.translation(0, 0.1, 0); break;
            case 39: _transformMatrix = AffineTransform3d.translation(0.1, 0, 0); break;
            case 40: _transformMatrix = AffineTransform3d.translation(0, -0.1, 0); break;
            case 65: _transformMatrix = AffineTransform3d.rotationOy(-0.1); break;
            case 68: _transformMatrix = AffineTransform3d.rotationOy(0.1); break;
            case 87: _transformMatrix = AffineTransform3d.rotationOx(-0.1); break;
            case 83: _transformMatrix = AffineTransform3d.rotationOx(0.1); break;
            case 90: _transformMatrix = AffineTransform3d.rotationOz(0.1); break;
            case 88: _transformMatrix = AffineTransform3d.rotationOz(-0.1); break;
            // case 32: _transformMatrix = AffineTransform3d.reflectionCenter(); break;
            // case 81: _transformMatrix = AffineTransform3d.scaling(0.9, 0.9); break;
            // case 69: _transformMatrix = AffineTransform3d.scaling(1.1, 1.1); break;
            case 67: _transformMatrix = AffineTransform3d.scaling(1.1, 1.1, 1.1); break;
            case 86: _transformMatrix = AffineTransform3d.scaling(0.9, 0.9, 0.9); break;
            default: _transformMatrix = AffineTransform3d.identity(); break;
        }
        console.log(_transformMatrix);
        let _currentVertices = this.currentModel.getWarframeModel().getVertices();
        let _newVertices = Matrix.MatrixMatrixMultiply(_transformMatrix, _currentVertices);
        console.log('NEW VERTICES');
        console.log(_newVertices);
        let _verticesCount = this.currentModel.getWarframeModel().getVerticesCount();
        let _edgesCount = this.currentModel.getWarframeModel().getEdgesCount();
        let _newWFModel = new WarframeModel(_verticesCount, _edgesCount);
        _newWFModel.setEdges(this.currentModel.getWarframeModel().getEdges());
        _newWFModel.setVertices(_newVertices);
        this.currentModel.setWarframeModel(_newWFModel);
        console.log("NEW WF VERTICES");
        console.log(this.currentModel.getWarframeModel().getVertices());
        this.transformed = true;
        this.projectedModel = this.translateModel(this.currentModel);
        this.plotter.clearCanvas();
        this.plotter.drawModel(this.projectedModel);
    }

    public applyTransform(transformMatrix: Matrix, model: Model3d): Model3d | any {
        let _model = new WarframeModel(model.getWarframeModel().getVerticesCount(), model.getWarframeModel().getEdgesCount());
        let _matrix = new Matrix(3, model.getWarframeModel().getVerticesCount());
        let _currentMatrix: Matrix = model.getWarframeModel().getVertices();

        _currentMatrix = Matrix.MatrixMatrixMultiply(transformMatrix, _currentMatrix);

        _matrix = _currentMatrix;
        _model.setVertices(_matrix);
        _model.setEdges(model.getWarframeModel().getEdges());

        return _model;
    }

    public reset(): void {
        let _index = this.state.getSelectedItem();
        this.currentModel = this.shapes.getPolyhedron(_index);
        this.transformed = false;
        this.projectedModel = this.translateModel(this.currentModel);
        this.plotter.clearCanvas();
        this.plotter.drawModel(this.projectedModel);
    }
}
