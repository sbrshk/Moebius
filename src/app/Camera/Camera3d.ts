import { Vector } from '../Matrix/Vector';
import { Matrix } from '../Matrix/Matrix';
import { Vertex } from '../Model/Model2d';
import { Vertex3d } from '../Model/Model3d';
import { Map } from 'core-js/library/web/timers';
import { transition } from '@angular/core';

export class Camera3d {
    // camera characteristics
    public D: number; // distacne between the camera and the screen
    private N: Vector; // screen normal vector
    private T: Vector; // vector to heaven

    // camera position
    public p: number;
    public q: number;
    public r: number;

    // view coordinate system center
    private viewXCenter: number;
    private viewYCenter: number;
    private viewZCenter: number;

    // view coordinate system basis
    public viewI: Vector;
    public viewJ: Vector;
    public viewK: Vector;

    constructor() {
        this.D = 10;

        this.p = this.q = this.r = 10;

        this.viewXCenter = 0;
        this.viewYCenter = 0;
        this.viewZCenter = 0;

        this.N = new Vector(3);
        this.N.elements = [-0.5, 0.7, 3];

        this.T = new Vector(3);
        this.T.elements = [0, 1, 0];

        this.calcViewBasis();
    }

    private calcViewBasis() {
        this.viewK = Vector.normalizeVector(this.N);
        this.viewI = Vector.normalizeVector(Vector.multiplyVectors(this.T, this.N));
        this.viewJ = Vector.multiplyVectors(this.viewK, this.viewI);
    }

    // private vertexCoordsToVector(vertex: Vertex3d): Vector {
    //     let vertexCoords = new Vector(3);
    //     vertexCoords.elements[0] = vertex.xCoord;
    //     vertexCoords.elements[1] = vertex.yCoord;
    //     vertexCoords.elements[2] = vertex.zCoord;

    //     return vertexCoords;
    // }

    // private vectorToVertexCoords(vector: Vector): Vertex3d | any {
    //     if (vector.dim !== 3) return;

    //     let vertex = new Vertex3d();
    //     vertex.xCoord = vector.elements[0];
    //     vertex.yCoord = vector.elements[1];
    //     vertex.zCoord = vector.elements[2];

    //     return vertex;
    // }

    private translateView(): Matrix {
        let translateMatrix = new Matrix(4, 4);

        let xi = this.viewI.elements[0];
        let yi = this.viewI.elements[1];
        let zi = this.viewI.elements[2];

        let xj = this.viewJ.elements[0];
        let yj = this.viewJ.elements[1];
        let zj = this.viewJ.elements[2];

        let xk = this.viewK.elements[0];
        let yk = this.viewK.elements[1];
        let zk = this.viewK.elements[2];

        translateMatrix.cells = [
            [xi, yi, zi, - (xi * this.viewXCenter + yi * this.viewYCenter + zi * this.viewZCenter)],
            [xj, yj, zj, - (xj * this.viewXCenter + yj * this.viewYCenter + zj * this.viewZCenter)],
            [xk, yk, zk, - (xk * this.viewXCenter + yk * this.viewYCenter + zk * this.viewZCenter)],
            [0, 0, 0, 1]
        ];

        return translateMatrix;
    }

    public projectVertices(vertices: Matrix, verticesCount: number): Matrix {
        let projectedVertices = new Matrix(3, verticesCount);
        vertices = Matrix.MatrixMatrixMultiply(this.translateView(), vertices);
        for (let i = 0; i < verticesCount; i++) {
            // let x = vertices.cells[0][i];
            // let y = vertices.cells[1][i];
            // let z = vertices.cells[2][i];
            // projectedVertices.cells[0][i] = x / (1 - x / this.p - y / this.q);
            // projectedVertices.cells[1][i] = y / (1 - x / this.p - y / this.q);
            projectedVertices.cells[0][i] = vertices.cells[0][i] / (1 - vertices.cells[2][i] / this.D);
            projectedVertices.cells[1][i] = vertices.cells[1][i] / (1 - vertices.cells[2][i] / this.D);
            projectedVertices.cells[2][i] = 1;
        }

        return projectedVertices;
    }
}
