import { Plotter2d } from '../../Plotter/Plotter2d';
import { Matrix } from '../../Matrix/Matrix';

export class InteractiveCanvas {
    private canvas: HTMLCanvasElement;
    private plotter: Plotter2d;
    private pointsCount: number;
    private points: Matrix;
    private linesCount: number;
    private lines: number[][];
    private maxDistance: number;
    private cursorLinesCount: number;
    private connectedPoints: Set<number>;
    private cursorLines: number[][];

    constructor(cnvs: HTMLCanvasElement) {
        this.canvas = cnvs;
        this.plotter = new Plotter2d(this.canvas);
        this.plotter.setFullResolution();
        this.plotter.setStrokeStyle('white');
        this.maxDistance = 3;

        // init points
        this.pointsCount = 230;
        this.points = new Matrix(2, this.pointsCount);
        for (let i = 0; i < this.pointsCount; i++) {
            this.points.cells[0][i] = this.plotter.translateXCoordBack(Math.random() * this.plotter.W);
            this.points.cells[1][i] = this.plotter.translateYCoordBack(Math.random() * this.plotter.H);
        }

        // init lines
        this.linesCount = 0;
        this.lines = [];
        for (let i = 0; i < this.pointsCount; i++) {
            for (let j = i; j < this.pointsCount; j++) {
                let x1 = this.points.cells[0][i];
                let y1 = this.points.cells[1][i];
                let x2 = this.points.cells[0][j];
                let y2 = this.points.cells[1][j];
                if (this.calculateDistance(x1, y1, x2, y2) < this.maxDistance * 0.8) {
                    this.lines[this.linesCount] = [i, j];
                    this.linesCount++;
                }
            }
        }
        this.drawLines();
    }

    private calculateDistance(x1: number, y1: number, x2: number, y2: number): number | any {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    private drawLines(): void {
        for (let i = 0; i < this.linesCount; i++) {
            let x1 = this.points.cells[0][this.lines[i][0]];
            let y1 = this.points.cells[1][this.lines[i][0]];
            let x2 = this.points.cells[0][this.lines[i][1]];
            let y2 = this.points.cells[1][this.lines[i][1]];
            this.plotter.drawLine(x1, y1, x2, y2);
        }
    }

    public generateCursorLines(xPosition: number, yPosition: number): void {
        this.cursorLinesCount = 0;
        this.connectedPoints = new Set<number>();
        for (let i = 0; i < this.pointsCount; i++) {
            if (this.calculateDistance(xPosition, yPosition, this.points.cells[0][i], this.points.cells[1][i]) < this.maxDistance) {
                this.cursorLinesCount++;
                this.connectedPoints.add(i);
            }
        }
    }

    public drawCursorLines(xPosition: number, yPosition: number): void {
        this.plotter.clearCanvas();
        this.drawLines();
        this.connectedPoints.forEach(index => {
            // console.log(index)
            let x = this.points.cells[0][index];
            let y = this.points.cells[1][index];
            console.log(xPosition + ' ' + yPosition);
            console.log(x + ' ' + y);
            this.plotter.drawLine(xPosition, yPosition, x, y);
        });
    }
}
