import { Component, OnInit, OnDestroy } from '@angular/core';
import { Model3d, WarframeModel } from '../../Model/Model3d';
import { Model2d } from '../../Model/Model2d';
import { Shapes3d } from '../../Shapes/Shapes3d';
import { AffineTransform3d } from '../../AffineTransform/AffineTransfrom3d';
import { Camera3d } from '../../Camera/Camera3d';
import { Plotter2d } from '../../Plotter/Plotter2d';
import { Matrix } from '../../Matrix/Matrix';
import { setInterval, setTimeout } from 'core-js/library/web/timers';

import { StateService } from '../state.service';

@Component({
    selector: 'startpage-component',
    templateUrl: 'startpage.component.html',
    styleUrls: ['../../../assets/sass/components/startpage.sass']
})

export class StartpageComponent implements OnInit, OnDestroy {
    private model3d: Model3d;
    public model: Model2d;
    private camera: Camera3d;
    private shapes: Shapes3d;
    private plotter: Plotter2d;
    private canvas: HTMLCanvasElement;

    constructor(private state: StateService) {
        this.shapes = new Shapes3d();
        this.camera = new Camera3d();
    }

    ngOnInit() {
        this.canvas = document.getElementById('startCanvas') as HTMLCanvasElement;
        this.plotter = new Plotter2d(this.canvas);
        this.model3d = this.shapes.getPolyhedron(7);
        this.model3d.setWarframeModel(this.model3d.convertModel(this.model3d.getPolygonalModel()));
        this.model = this.translateModel(this.model3d);
        this.plotter.setFullResolution();
        this.plotter.setStrokeStyle('white');
        this.plotter.drawModel(this.model);

        // setTimeout(() => {
        //     this.rotateModel();
        // }, 500);
        // this.rotateModel();

        setInterval(() => {
            this.rotateModel();
        }, 15);
    }


    ngOnDestroy() {
        console.log('EXIT START PAGE');
    }

    private translateModel(model: Model3d): Model2d | any {
        let model2d = new Model2d(model.getWarframeModel().getVerticesCount(), model.getWarframeModel().getEdgesCount());
        model2d.setEdges(model.getWarframeModel().getEdges());
        let _translatedVertices = this.camera.projectVertices(model.getWarframeModel().getVertices(), model.getWarframeModel().getVerticesCount());
        model2d.setVertices(_translatedVertices);
        return model2d;
    }

    private rotateModel(): void {
        let _transformMatrix = AffineTransform3d.rotationOy(0.01);
        _transformMatrix = Matrix.MatrixMatrixMultiply(AffineTransform3d.rotationOx(0.01), _transformMatrix);
        _transformMatrix = Matrix.MatrixMatrixMultiply(AffineTransform3d.rotationOz(0.01), _transformMatrix);
        let _currentVertices = this.model3d.getWarframeModel().getVertices();
        let _newVertices = Matrix.MatrixMatrixMultiply(_transformMatrix, _currentVertices);
        let _verticesCount = this.model3d.getWarframeModel().getVerticesCount();
        let _edgesCount = this.model3d.getWarframeModel().getEdgesCount();
        let _newWFModel = new WarframeModel(_verticesCount, _edgesCount);
        _newWFModel.setEdges(this.model3d.getWarframeModel().getEdges());
        _newWFModel.setVertices(_newVertices);
        this.model3d.setWarframeModel(_newWFModel);
        this.model = this.translateModel(this.model3d);
        this.plotter.clearCanvas();
        this.plotter.drawModel(this.model);
    }

    public goTo(): void {
        let _elements = document.getElementsByClassName('animated');
        for (let i = 0; i < _elements.length; i++) {
            _elements[i].classList.remove('fadeIn');
            _elements[i].classList.add('fadeOut');
        }
        setTimeout(() => {
            document.getElementById('startPage').className = 'animated fadeOut';
            setTimeout(() => {
                this.state.leaveStartPage();
            }, 700);
        }, 500);
    }
}
