import { Component, OnInit } from '@angular/core';
import { Matrix } from '../../../Matrix/Matrix';
import { Model2d } from '../../../Model/Model2d';
import { Model3d, WarframeModel } from '../../../Model/Model3d';
import { Shapes3d } from '../../../Shapes/Shapes3d';
import { Camera3d } from '../../../Camera/Camera3d';
import { Plotter2d } from '../../../Plotter/Plotter2d';
import { AffineTransform3d } from '../../../AffineTransform/AffineTransfrom3d';

import { StateService } from '../../state.service';
import { _, Map } from 'core-js/library/web/timers';

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
                this.plotter.draw3dAxis(this.camera.viewI, this.camera.viewJ, this.camera.viewK, this.camera.D);
                this.plotter.drawModel(this.projectedModel);
            }
        });
    }

    private translateModel(model: Model3d): Model2d | any {
        if (!this.transformed && this.modelSelected) {
            model.setWarframeModel(model.convertModel(model.getPolygonalModel()));
        }
        let model2d = new Model2d(model.getWarframeModel().getVerticesCount(), model.getWarframeModel().getEdgesCount());
        model2d.setEdges(model.getWarframeModel().getEdges());
        let _translatedVertices = this.camera.projectVertices(model.getWarframeModel().getVertices(), model.getWarframeModel().getVerticesCount());
        model2d.setVertices(_translatedVertices);
        return model2d;
    }

    public onResize(): void {
        if (this.modelSelected) {
            this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
            this.plotter = new Plotter2d(this.canvas);
            this.plotter.draw3dAxis(this.camera.viewI, this.camera.viewJ, this.camera.viewK, this.camera.D);
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
            case 67: _transformMatrix = AffineTransform3d.scaling(1.1, 1.1, 1.1); break;
            case 86: _transformMatrix = AffineTransform3d.scaling(0.9, 0.9, 0.9); break;
            // rotation around the symmetry axis
            case 32: {
                let x1, x2, y1, y2, z1, z2;
                switch (this.state.getSelectedItem()) {
                    // tetrahedron
                    case 4: {
                        x1 = this.currentModel.getWarframeModel().getVertices().cells[0][3];
                        y1 = this.currentModel.getWarframeModel().getVertices().cells[1][3];
                        z1 = this.currentModel.getWarframeModel().getVertices().cells[2][3];

                        let xA = this.currentModel.getWarframeModel().getVertices().cells[0][0];
                        let yA = this.currentModel.getWarframeModel().getVertices().cells[1][0];
                        let zA = this.currentModel.getWarframeModel().getVertices().cells[2][0];

                        let xB = this.currentModel.getWarframeModel().getVertices().cells[0][1];
                        let yB = this.currentModel.getWarframeModel().getVertices().cells[1][1];
                        let zB = this.currentModel.getWarframeModel().getVertices().cells[2][1];

                        let xC = this.currentModel.getWarframeModel().getVertices().cells[0][2];
                        let yC = this.currentModel.getWarframeModel().getVertices().cells[1][2];
                        let zC = this.currentModel.getWarframeModel().getVertices().cells[2][2];

                        x2 = (xA + xB + xC) / 3;
                        y2 = (yA + yB + yC) / 3;
                        z2 = (zA + zB + zC) / 3;
                        break;
                    }
                    // octahedron
                    case 5: {
                        x1 = this.currentModel.getWarframeModel().getVertices().cells[0][4];
                        x2 = this.currentModel.getWarframeModel().getVertices().cells[0][5];
                        y1 = this.currentModel.getWarframeModel().getVertices().cells[1][4];
                        y2 = this.currentModel.getWarframeModel().getVertices().cells[1][5];
                        z1 = this.currentModel.getWarframeModel().getVertices().cells[2][4];
                        z2 = this.currentModel.getWarframeModel().getVertices().cells[2][5];
                        break;
                    }
                    // bipyramid
                    case 6: {
                        x1 = this.currentModel.getWarframeModel().getVertices().cells[0][0];
                        x2 = this.currentModel.getWarframeModel().getVertices().cells[0][1];
                        y1 = this.currentModel.getWarframeModel().getVertices().cells[1][0];
                        y2 = this.currentModel.getWarframeModel().getVertices().cells[1][1];
                        z1 = this.currentModel.getWarframeModel().getVertices().cells[2][0];
                        z2 = this.currentModel.getWarframeModel().getVertices().cells[2][1];
                        break;
                    }
                }
                _transformMatrix = AffineTransform3d.identity();
                let T1 = new Matrix(4, 4);
                T1.cells = [
                    [1, 0, 0, -x2],
                    [0, 1, 0, -y2],
                    [0, 0, 1, -z2],
                    [0, 0, 0, 1]
                ];

                let A = x1 - x2;
                let B = y1 - y2;
                let C = z1 - z2;
                let cosAlpha = A / Math.sqrt(A * A + B * B + C * C);
                let sinAlpha = Math.sqrt(B * B + C * C) / Math.sqrt(A * A + B * B + C * C);
                let RzAlpha = new Matrix(4, 4);
                RzAlpha.cells = [
                    [cosAlpha,  - sinAlpha, 0, 0],
                    [sinAlpha, cosAlpha, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]
                ];
                let RzMinusAlpha = new Matrix(4, 4);
                RzMinusAlpha.cells = [
                    [cosAlpha, sinAlpha, 0, 0],
                    [ - sinAlpha, cosAlpha, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]
                ];
                let cosBeta = B / Math.sqrt(B * B + C * C);
                let sinBeta = C / Math.sqrt(B * B + C * C);
                let RxBeta = new Matrix(4, 4);
                RxBeta.cells = [
                    [1, 0, 0, 0],
                    [0, cosBeta, - sinBeta, 0],
                    [0, sinBeta, cosBeta, 0],
                    [0, 0, 0, 1]
                ];
                let RxMinusBeta = new Matrix(4, 4);
                RxMinusBeta.cells = [
                    [1, 0, 0, 0],
                    [0, cosBeta, sinBeta, 0],
                    [0, - sinBeta, cosBeta, 0],
                    [0, 0, 0, 1]
                ];

                let T2 = new Matrix(4, 4);
                T2.cells = [
                    [1, 0, 0, x2],
                    [0, 1, 0, y2],
                    [0, 0, 1, z2],
                    [0, 0, 0, 1]
                ];

                _transformMatrix = Matrix.MatrixMatrixMultiply(T1, _transformMatrix);
                _transformMatrix = Matrix.MatrixMatrixMultiply(RxMinusBeta, _transformMatrix);
                _transformMatrix = Matrix.MatrixMatrixMultiply(RzMinusAlpha, _transformMatrix);
                _transformMatrix = Matrix.MatrixMatrixMultiply(AffineTransform3d.rotationOx(0.1), _transformMatrix);
                _transformMatrix = Matrix.MatrixMatrixMultiply(RzAlpha, _transformMatrix);
                _transformMatrix = Matrix.MatrixMatrixMultiply(RxBeta, _transformMatrix);
                _transformMatrix = Matrix.MatrixMatrixMultiply(T2, _transformMatrix);
                break;
            }
            default: _transformMatrix = AffineTransform3d.identity(); break;
        }
        let _currentVertices = this.currentModel.getWarframeModel().getVertices();
        let _newVertices = Matrix.MatrixMatrixMultiply(_transformMatrix, _currentVertices);
        let _verticesCount = this.currentModel.getWarframeModel().getVerticesCount();
        let _edgesCount = this.currentModel.getWarframeModel().getEdgesCount();
        let _newWFModel = new WarframeModel(_verticesCount, _edgesCount);
        _newWFModel.setEdges(this.currentModel.getWarframeModel().getEdges());
        _newWFModel.setVertices(_newVertices);
        this.currentModel.setWarframeModel(_newWFModel);
        this.transformed = true;
        this.projectedModel = this.translateModel(this.currentModel);
        this.plotter.clearCanvas();
        this.plotter.draw3dAxis(this.camera.viewI, this.camera.viewJ, this.camera.viewK, this.camera.D);
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
        this.plotter.draw3dAxis(this.camera.viewI, this.camera.viewJ, this.camera.viewK, this.camera.D);
        this.plotter.drawModel(this.projectedModel);
    }
}
