import { Matrix } from '../Matrix/Matrix';

export class Vertex3d {
    public xCoord: number;
    public yCoord: number;
    public zCoord: number;

    constructor () {
        this.xCoord = null;
        this.yCoord = null;
        this.zCoord = null;
    }
}

export class PolygonalModel {}

export class WarframeModel {
    private verticesCount: number;
    private edgesCount: number;
    private vertices: Matrix;
    private edges: Matrix;

    constructor(N: number, M: number) {
        this.verticesCount = N;
        this.edgesCount = M;
        this.vertices = new Matrix(4, N);
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

    public getVertex(index: number): Vertex3d {
        let _vertex = new Vertex3d();
        _vertex.xCoord = this.vertices.cells[0][index] / this.vertices.cells[3][index];
        _vertex.yCoord = this.vertices.cells[1][index] / this.vertices.cells[3][index];
        _vertex.zCoord = this.vertices.cells[2][index] / this.vertices.cells[3][index];
        return _vertex;
    }
}

export class Model3d {
    private pModel: PolygonalModel;
    private wModel: WarframeModel;

    public getPolygonalModel(): PolygonalModel {
        return this.pModel;
    }

    public setPolygonalModel(model: PolygonalModel): void {
        this.pModel = model;
    }

    public getWarframeModel(): WarframeModel {
        return this.wModel;
    }

    public setWarframeModel(model: WarframeModel): void {
        this.wModel = model;
    }

    // public convertModel(model:)
}
