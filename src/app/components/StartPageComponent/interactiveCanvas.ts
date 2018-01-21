import { Plotter2d } from '../../Plotter/Plotter2d';
import { Matrix } from '../../Matrix/Matrix';

export class InteractiveCanvas {
    private canvas: HTMLCanvasElement;
    private plotter: Plotter2d;
    private pointsCount: number;
    private points: Matrix;
    // private linesCount: number;
    // private lines: Matrix;
    private maxDistance: number;
    private cursorLinesCount: number;
    private cursorLines: Matrix;

    constructor(cnvs: HTMLCanvasElement) {
        this.canvas = cnvs;
        this.plotter = new Plotter2d(this.canvas);
        this.plotter.setFullResolution();
        this.maxDistance = 2;

        // init points
        this.pointsCount = 100;
        this.points = new Matrix(3, this.pointsCount);
        for (let i = 0; i < this.pointsCount; i++) {
            this.points.cells[0][i] = this.plotter.translateXCoordBack(Math.random() * this.plotter.W);
            this.points.cells[1][i] = this.plotter.translateYCoordBack(Math.random() * this.plotter.H);
            this.points.cells[2][i] = 1;
        }
    }
}
