import { Vertex3d, Model3d } from '../Model/Model3d';
import { AffineTransform } from '../AffineTransform/AffineTransform';
import { Matrix } from '../Matrix/Matrix';

export class Plotter3d {
    private canvas: HTMLCanvasElement;
    public xCenter: number;
    public yCenter: number;
    public zCenter: number;
    public scale: number;
}
