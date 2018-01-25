import { Plotter2d } from '../../Plotter/Plotter2d';
import { Matrix } from '../../Matrix/Matrix';
import { setInterval, setTimeout } from 'core-js/library/web/timers';

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
    private cursorX: number;
    private cursorY: number;

    constructor(cnvs: HTMLCanvasElement) {
        this.canvas = cnvs;
        this.plotter = new Plotter2d(this.canvas);
        this.plotter.setFullResolution();
        this.plotter.setStrokeStyle('white');
        this.plotter.setLineWidth(0.35);
        this.maxDistance = 2.5;
        this.cursorX = 0;
        this.cursorY = 0;

        // init points
        this.pointsCount = 300;
        this.points = new Matrix(2, this.pointsCount);
        for (let i = 0; i < this.pointsCount; i++) {
            this.points.cells[0][i] = this.plotter.translateXCoordBack(Math.random() * this.plotter.W);
            this.points.cells[1][i] = this.plotter.translateYCoordBack(Math.random() * this.plotter.H);
        }

        // setTimeout(() => {}, 100);

        this.generateLines();
        this.drawLines();

        setInterval(() => {
            this.transformPoints();
            this.plotter.clearCanvas();
            this.drawLines();
            this.generateCursorLines(this.cursorX, this.cursorY);
            this.drawCursorLines(this.cursorX, this.cursorY);
        }, 30);
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

    private transformPoints(): void {
        for (let i = 0; i < this.pointsCount; i++) {
            if (i % 2 === 0) {
                this.points.cells[0][i] += 0.01;
                if (i % 4 === 0) {
                    this.points.cells[1][i] += 0.01;
                } else {
                    this.points.cells[1][i] -= 0.01;
                }
            } else {
                this.points.cells[0][i] -= 0.01;
                if (i % 4 === 1) {
                    this.points.cells[1][i] += 0.01;
                } else {
                    this.points.cells[1][i] -= 0.01;
                }
            }

            let _Xs = this.plotter.translateXCoord(this.points.cells[0][i]);
            let _Ys = this.plotter.translateYCoord(this.points.cells[1][i]);
            if (_Xs > this.plotter.W) {
                this.points.cells[0][i] = this.plotter.translateXCoordBack(0);
            } else if (_Xs < 0) {
                this.points.cells[0][i] = this.plotter.translateXCoordBack(this.plotter.W);
            }
            if (_Ys > this.plotter.H) {
                this.points.cells[1][i] = this.plotter.translateYCoordBack(0);
            } else if (_Ys < 0) {
                this.points.cells[1][i] = this.plotter.translateYCoordBack(this.plotter.H);
            }
        }
        this.generateLines();
    }

    private generateLines(): void {
        this.linesCount = 0;
        this.lines = [];
        for (let i = 0; i < this.pointsCount; i++) {
            for (let j = i; j < this.pointsCount; j++) {
                let x1 = this.points.cells[0][i];
                let y1 = this.points.cells[1][i];
                let x2 = this.points.cells[0][j];
                let y2 = this.points.cells[1][j];
                if (this.calculateDistance(x1, y1, x2, y2) < this.maxDistance * 0.75) {
                    this.lines[this.linesCount] = [i, j];
                    this.linesCount++;
                }
            }
        }
    }

    public setCursorPosition(x: number, y: number): void {
        this.cursorX = x;
        this.cursorY = y;
    }

    public generateCursorLines(xPosition: number, yPosition: number): void {
        this.cursorLinesCount = 0;
        this.connectedPoints = new Set<number>();
        for (let i = 0; i < this.pointsCount; i++) {
            if (this.calculateDistance(xPosition, yPosition, this.points.cells[0][i], this.points.cells[1][i]) < this.maxDistance * 1.25) {
                this.cursorLinesCount++;
                this.connectedPoints.add(i);
            }
        }
    }

    public drawCursorLines(xPosition: number, yPosition: number): void {
        this.plotter.clearCanvas();
        this.drawLines();
        // this.plotter.setStrokeStyle('white');
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
