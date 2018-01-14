import { Matrix } from '../Matrix/Matrix';

export class Vertex {
    public xCoord: number;
    public yCoord: number;

    constructor() {
        this.xCoord = null;
        this.yCoord = null;
    }
}

export class Model2d {
    private verticesCount: number;
    private edgesCount: number;
    private vertices: Matrix;
    private edges: Matrix;

    constructor(N: number, M: number) {
        this.verticesCount = N;
        this.edgesCount = M;
        this.vertices = new Matrix(3, N);
        this.edges = new Matrix(M, 2);
    }

    public getVerticesCount(): number {
        return this.verticesCount;
    }

    public setVerticesCount(_size: number): void {
        this.verticesCount = _size;
    }

    public getEdgesCount(): number {
        return this.edgesCount;
    }

    public setEdgesCount(_size: number): void {
        this.edgesCount = _size;
    }

    public getVertices(): Matrix {
        return this.vertices;
    }

    public setVertices(vertices: Matrix): void {
        this.vertices = vertices;
    }

    public getEdges(): Matrix {
        return this.edges;
    }

    public setEdges(edges: Matrix): void {
        this.edges = edges;
    }

    public getVertex(index: number): Vertex {
        let _vertex = new Vertex();
        // if (this.vertices.cells[2][index] !== 0) {
            _vertex.xCoord = this.vertices.cells[0][index] / this.vertices.cells[2][index];
            _vertex.yCoord = this.vertices.cells[1][index] / this.vertices.cells[2][index];
        // } else {
            // _vertex.xCoord = this.vertices.cells[0][index];
            // _vertex.yCoord = this.vertices.cells[1][index];
        // }
        return _vertex;
    }
}
