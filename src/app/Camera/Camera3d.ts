import { Matrix } from '../Matrix/Matrix';
import { Vector } from '../Matrix/Vector';
import { Vertex3d, Model3d } from '../Model/Model3d';

export class Camera3d {
    private D: number; // distacne between the camera and the screen
    private canvas: HTMLCanvasElement;
    private N: Vector; // screen normal vector
    private T: Vector; // vector to heaven

    constructor() {}

}
