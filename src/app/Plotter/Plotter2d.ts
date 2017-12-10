import { Vertex, Model2d } from '../Model/Model2d';
import { AffineTransform } from '../AffineTransform/AffineTransform';
import { Matrix } from '../Matrix/Matrix';

export class Plotter2d {
    private canvas: HTMLCanvasElement;
    public xCenter: number;
    public yCenter: number;
    public scale: number;
    private W: number;
    private H: number;

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
    }

    public setResolution(): void {
        this.W = document.documentElement.clientWidth * 0.8;
        this.H = document.documentElement.clientHeight;
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

    public translateXCoord(coord): number {
        return this.xCenter + coord * this.scale;
    }

    public translateYCoord(coord): number {
        return this.yCenter - coord * this.scale;
    }

    public drawModel(model: Model2d): void {
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = 'black';
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
