import { Matrix } from '../Matrix/Matrix';
import { WarframeModel, PolygonalModel, Model3d } from '../Model/Model3d';

export class Shapes3d {
    private Tetrahedron: Model3d;
    private Octahedron: Model3d;
    private Bipyramid: Model3d;

    constructor() {
        // Tetrahedron
        this.Tetrahedron = new Model3d();
        let _pTetrahedron = new PolygonalModel(4, 4);
        let tetrahedronVertices = new Matrix(4, 4);
        tetrahedronVertices.cells = [
            [0, 1, 2, 1],
            [0, 0, 0, 4 * Math.sqrt(2) / 3],
            [0, Math.sqrt(3), 0, Math.sqrt(3) / 3],
            [1, 1, 1, 1]
        ];
        let tetrahedronFaces = new Matrix(4, 3);
        tetrahedronFaces.cells = [
            [1, 2, 3],
            [1, 2, 4],
            [2, 3, 4],
            [1, 3, 4]
        ];
        _pTetrahedron.setVertices(tetrahedronVertices);
        _pTetrahedron.setFaces(tetrahedronFaces);
        this.Tetrahedron.setPolygonalModel(_pTetrahedron);

        // Octahedron
        this.Octahedron = new Model3d();
        let _pOctahedron = new PolygonalModel(6, 8);
        let octahedronVertices = new Matrix(4, 6);
        octahedronVertices.cells = [
            [0, 0, 2, 2, 1, 1],
            [0, 0, 0, 0, 2, -2],
            [0, 2, 2, 0, 1, 1],
            [1, 1, 1, 1, 1, 1]
        ];
        let octahedronFaces = new Matrix(8, 3);
        octahedronFaces.cells = [
            [1, 2, 5],
            [2, 3, 5],
            [3, 4, 5],
            [1, 4, 5],
            [1, 2, 6],
            [2, 3, 6],
            [3, 4, 6],
            [1, 4, 6]
        ];
        _pOctahedron.setVertices(octahedronVertices);
        _pOctahedron.setFaces(octahedronFaces);
        this.Octahedron.setPolygonalModel(_pOctahedron);

        // Gyroelongated square bipyramid
        this.Bipyramid = new Model3d();
        let _pBipyramid = new PolygonalModel(10, 16);
        let bipyramidVertices = new Matrix(4, 10);
        let c = 1 / Math.sqrt(Math.sqrt(2));
        bipyramidVertices.cells = [
            [1, 1, 2, 0, 2, 0, 1 + Math.sqrt(2), 1 - Math.sqrt(2), 1, 1],
            [Math.sqrt(2) + c, - Math.sqrt(2) - c, c, c, c, c, -c, -c, -c, -c],
            [1, 1, 2, 2, 0, 0, 1, 1, 1 + Math.sqrt(2), 1 - Math.sqrt(2)],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        let bipyramidFaces = new Matrix(16, 3);
        bipyramidFaces.cells = [
            [1, 3, 4],
            [1, 4, 5],
            [1, 5, 6],
            [1, 3, 6],
            [2, 7, 8],
            [2, 8, 9],
            [2, 9, 10],
            [2, 10, 7],
            [3, 7, 4],
            [7, 4, 8],
            [4, 8, 5],
            [5, 8, 9],
            [5, 6, 9],
            [6, 9, 10],
            [3, 10, 6],
            [3, 10, 7]
        ];
        _pBipyramid.setVertices(bipyramidVertices);
        _pBipyramid.setFaces(bipyramidFaces);
        this.Bipyramid.setPolygonalModel(_pBipyramid);
    }

    public getPolyhedron(index: number): Model3d | any {
        switch (index) {
            case 4: return this.Tetrahedron;
            case 5: return this.Octahedron;
            case 6: return this.Bipyramid;
            default: return -1;
        }
    }
}
