import { Vertex, Model2d } from '../Model/Model2d';
import { Vector } from '../Matrix/Vector';
import { Matrix } from '../Matrix/Matrix';

export class Plotter2d {
    private canvas: HTMLCanvasElement;
    public xCenter: number;
    public yCenter: number;
    public scale: number;
    public W: number;
    public H: number;
    private strokeStyle: string;
    private lineWidth: number;

    constructor(cnvs: HTMLCanvasElement) {
        this.canvas = cnvs;
        this.setResolution();
        this.canvas.setAttribute('width', this.W.toString() + 'px');
        this.canvas.setAttribute('height', this.H.toString() + 'px');
        this.xCenter = this.canvas.width * 0.5;
        this.yCenter = this.canvas.height * 0.5;
        if (this.canvas.height < this.canvas.width) {
            this.scale = this.canvas.height / 20;
        } else {
            this.scale = this.canvas.width / 20;
        }
        this.strokeStyle = 'black';
        this.lineWidth = 1;
    }

    public setResolution(): void {
        this.W = document.documentElement.clientWidth * 0.8;
        this.H = document.documentElement.clientHeight;
    }

    public setFullResolution(): void {
        this.W = document.documentElement.clientWidth;
        this.H = document.documentElement.clientHeight;
        this.canvas.setAttribute('width', this.W.toString() + 'px');
        this.canvas.setAttribute('height', this.H.toString() + 'px');
        this.xCenter = this.canvas.width * 0.5;
        this.yCenter = this.canvas.height * 0.5;
        if (this.canvas.height < this.canvas.width) {
            this.scale = this.canvas.height / 20;
        } else {
            this.scale = this.canvas.width / 20;
        }
    }

    public setStrokeStyle(strStyle: string): void {
        this.strokeStyle = strStyle;
    }

    public setLineWidth(width: number): void {
        this.lineWidth = width;
    }

    public clearCanvas(): void {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.W, this.H);
    }

    public drawAxis(): void {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.W, this.H);
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.moveTo(this.xCenter, 0);
        ctx.lineTo(this.xCenter, this.canvas.height);
        ctx.moveTo(0, this.yCenter);
        ctx.lineTo(this.canvas.width, this.yCenter);
        ctx.stroke();
    }

    public draw3dAxis(x: Vector, y: Vector, z: Vector, D: number): void {
        let xX = x.elements[0] / (1 - x.elements[2] / D) * this.scale;
        let xY = x.elements[1] / (1 - x.elements[2] / D) * this.scale;
        let yX = y.elements[0] / (1 - y.elements[2] / D) * this.scale;
        let yY = - y.elements[1] / (1 - y.elements[2] / D) * this.scale;
        let zX = z.elements[0] / (1 - z.elements[2] / D) * this.scale;
        let zY = z.elements[1] / (1 - z.elements[2] / D) * this.scale;

        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        let centerX = this.scale * 1.5;
        let centerY = this.scale * 1.5;
        // x axis
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + xX, centerY + xY);
        ctx.arc(centerX + xX, centerY + xY, 1, 0, Math.PI * 2);

        // y axis
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + yX, centerY + yY);
        ctx.arc(centerX + yX, centerY + yY, 1, 0, Math.PI * 2);

        // z axis
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + zX, centerY + zY);
        ctx.arc(centerX + zX, centerY + zY, 1, 0, Math.PI * 2);

        ctx.moveTo(centerX, centerY);
        if (xX === 0 && xY === 0 || yX === 0 && yY === 0 || zX === 0 && zY === 0) {
            ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'grey';
            ctx.fill();
        }
        ctx.stroke();
    }

    public translateXCoord(coord): number {
        return this.xCenter + coord * this.scale;
    }

    public translateYCoord(coord): number {
        return this.yCenter - coord * this.scale;
    }

    public translateXCoordBack(coord): number {
        return (coord - this.xCenter) / this.scale;
    }

    public translateYCoordBack(coord): number {
        return ( - coord + this.yCenter) / this.scale;
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number): void {
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        // ctx.lineWidth = 0.15;
        ctx.moveTo(this.translateXCoord(x1), this.translateYCoord(y1));
        ctx.lineTo(this.translateXCoord(x2), this.translateYCoord(y2));
        ctx.stroke();
    }

    public drawModel(model: Model2d): void {
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        for (let i = 0; i < model.getEdgesCount(); i++) {
            let _vertexBegin: Vertex = model.getVertex(model.getEdges().cells[i][0] - 1);
            let _vertexEnd: Vertex = model.getVertex(model.getEdges().cells[i][1] - 1);
            ctx.moveTo(this.translateXCoord(_vertexBegin.xCoord), this.translateYCoord(_vertexBegin.yCoord));
            ctx.lineTo(this.translateXCoord(_vertexEnd.xCoord), this.translateYCoord(_vertexEnd.yCoord));
        }
        ctx.stroke();
    }

    public drawPivot(xCoord: number, yCoord: number): void {
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(xCoord - 3, yCoord);
        ctx.lineTo(xCoord + 3, yCoord);
        ctx.moveTo(xCoord, yCoord - 3);
        ctx.lineTo(xCoord, yCoord + 3);
        ctx.stroke();
    }

    public setPivot(xCoord: number, yCoord: number): number[] {
        let _xW = (xCoord - this.xCenter) / this.scale;
        let _yW = (this.yCenter - yCoord) / this.scale;
        this.drawPivot(xCoord, yCoord);
        return [_xW, _yW];
    }
}
