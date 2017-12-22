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

export class PolygonalModel {
    private verticesCount: number;
    private facesCount: number;
    private vertices: Matrix;
    private faces: Matrix;

    constructor (N: number, M: number) {
        this.verticesCount = N;
        this.facesCount = M;
        this.vertices = new Matrix(4, N);
        this.faces = new Matrix(M, 3);
    }

    public getVerticesCount(): number {
        return this.verticesCount;
    }

    public setVerticesCount(_size: number): void {
        this.verticesCount = _size;
    }

    public getFacesCount(): number {
        return this.facesCount;
    }

    public setFacesCount(_size: number): void {
        this.facesCount = _size;
    }

    public getVertices(): Matrix {
        return this.vertices;
    }

    public setVertices(vertices: Matrix): void {
        this.vertices = vertices;
    }

    public getFaces(): Matrix {
        return this.faces;
    }

    public setFaces(faces: Matrix): void {
        this.faces = faces;
    }

    public getVertex(index: number): Vertex3d {
        let _vertex = new Vertex3d();
        _vertex.xCoord = this.vertices.cells[0][index] / this.vertices.cells[3][index];
        _vertex.yCoord = this.vertices.cells[1][index] / this.vertices.cells[3][index];
        _vertex.zCoord = this.vertices.cells[2][index] / this.vertices.cells[3][index];
        return _vertex;
    }
}

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

    private computeEdges(pModel: PolygonalModel): object | any {
        let _edges = new Set<string>();
        let _edgesCount = 0;
        for (let i = 0; i < pModel.getFacesCount(); i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = j + 1; k < 3; k++) {
                    let _pair = [pModel.getFaces().cells[i][j], pModel.getFaces().cells[i][k]];
                    let _pairString = _pair.join(' ');
                    if (!_edges.has(_pairString)) {
                        _edges.add(_pairString);
                        _edgesCount++;
                    }
                }
            }
        }

        let edges = new Matrix(_edgesCount, 2);
        let i = 0;
        _edges.forEach(item => {
            let _itemArr = [Number.parseInt(item.split(' ')[0]), Number.parseInt(item.split(' ')[1])];
            // console.log(_itemArr);
            edges.cells[i] = _itemArr;
            i++;
        });

        // let _edges = new Set<Set<number>>();
        // let _edgesCount = 0;
        // for (let i = 0; i < pModel.getFacesCount(); i++) {
        //     for (let j = 0; j < 3; j++) {
        //         for (let k = j + 1; k < 3; k++) {
        //             let _pair = new Set<number>();
        //             _pair.add(pModel.getFaces().cells[i][j]);
        //             _pair.add(pModel.getFaces().cells[i][k]);
        //             _edges.add(_pair);
        //             _edgesCount++;
        //         }
        //     }
        // }
        // let edges = new Matrix(_edgesCount, 2);
        // let i = 0;
        // _edges.forEach(item => {
        //     edges.cells[i] = Array.from(item);
        //     i++;
        // });

        return {
            edges: edges,
            edgesCount: _edgesCount
        };
    }

    public convertModel(pModel: PolygonalModel): WarframeModel {
        let edges = this.computeEdges(pModel);
        let wModel = new WarframeModel(pModel.getVerticesCount(), edges.edgesCount);
        wModel.setVertices(pModel.getVertices());
        wModel.setEdges(edges.edges);

        return wModel;
    }
}
