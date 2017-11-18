import { Vertex, Model } from '../Model/Model';
import { AffineTransform } from '../AffineTransform/AffineTransform';

export class Plotter {
    private canvas: HTMLCanvasElement;
    private xCenter: number;
    private yCenter: number;
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
        this.scale = 40;
    }

    public setResolution(): void {
        this.W = document.documentElement.clientWidth;
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

    private translateXCoord(coord): number {
        return this.xCenter + coord * this.scale;
    }

    private translateYCoord(coord): number {
        return this.yCenter - coord * this.scale;
    }

    public drawModel(model: Model): void {
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
}
