import { Matrix } from '../Matrix/Matrix';
import { AffineTransform3d } from '../AffineTransform/AffineTransfrom3d';
import { WarframeModel, PolygonalModel, Model3d } from '../Model/Model3d';

export class Shapes3d {
    private Tetrahedron: Model3d;
    private Octahedron: Model3d;
    private Bipyramid: Model3d;
    private Icosahedron: Model3d;

    constructor() {
        // Tetrahedron
        this.Tetrahedron = new Model3d();
        let _pTetrahedron = new PolygonalModel(4, 4);
        let tetrahedronVertices = new Matrix(4, 4);
        tetrahedronVertices.cells = [
            [-2, 2, 0, 0],
            [0, 0, 0, 2 * Math.sqrt(3)],
            [-2 / Math.sqrt(3), -2 / Math.sqrt(3), 4 / Math.sqrt(3), 0],
            [1, 1, 1, 1]
        ];
        tetrahedronVertices = Matrix.MatrixMatrixMultiply(AffineTransform3d.scaling(1.5, 1.5, 1.5), tetrahedronVertices);
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
            [-2, -2, 2, 2, 0, 0],
            [0, 0, 0, 0, 2 * Math.sqrt(2), -2 * Math.sqrt(2)],
            [-2, 2, 2, -2, 0, 0],
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
        let b = Math.sqrt(2);
        let c = 1 / Math.sqrt(Math.sqrt(2));
        bipyramidVertices.cells = [
            [0, 0, 1, -1, 1, -1, b, -b, 0, 0],
            [b + c, - b - c, c, c, c, c, -c, -c, -c, -c],
            [0, 0, 1, 1, -1, -1, 0, 0, b, -b],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        bipyramidVertices = Matrix.MatrixMatrixMultiply(AffineTransform3d.scaling(1.5, 1.5, 1.5), bipyramidVertices);
        let bipyramidFaces = new Matrix(16, 3);
        bipyramidFaces.cells = [
            [1, 3, 4],
            [1, 3, 5],
            [1, 5, 6],
            [1, 4, 6],
            [4, 9, 3],
            [9, 3, 7],
            [3, 7, 5],
            [7, 5, 10],
            [5, 10, 6],
            [10, 6, 8],
            [6, 8, 4],
            [8, 4, 9],
            [2, 7, 9],
            [2, 7, 10],
            [2, 8, 10],
            [2, 8, 9]
        ];
        _pBipyramid.setVertices(bipyramidVertices);
        _pBipyramid.setFaces(bipyramidFaces);
        this.Bipyramid.setPolygonalModel(_pBipyramid);

        // Icosahedron
        this.Icosahedron = new Model3d();
        let _pIcosahedron = new PolygonalModel(12, 20);
        let icosahedronVertices = new Matrix(4, 12);
        for (let i = 0; i < 10; i++) {
            icosahedronVertices.cells[0][i] = Math.cos(Math.PI * i / 5);
            icosahedronVertices.cells[1][i] = Math.sin(Math.PI * i / 5);
            icosahedronVertices.cells[2][i] = Math.pow(- 1, i + 1) * 0.5;
            icosahedronVertices.cells[3][i] = 1;
        }
        icosahedronVertices.cells[0][10] = 0;
        icosahedronVertices.cells[0][11] = 0;
        icosahedronVertices.cells[2][10] = - 1.2;
        icosahedronVertices.cells[2][11] = 1.2;
        icosahedronVertices.cells[1][10] = 0;
        icosahedronVertices.cells[1][11] = 0;
        icosahedronVertices.cells[3][10] = 1;
        icosahedronVertices.cells[3][11] = 1;
        icosahedronVertices = Matrix.MatrixMatrixMultiply(AffineTransform3d.scaling(3, 3, 3), icosahedronVertices);
        let icosahedronFaces = new Matrix(20, 3);
        icosahedronFaces.cells = [
            [1, 11, 3],
            [3, 11, 5],
            [5, 11, 7],
            [7, 11, 9],
            [9, 11, 1],
            [1, 2, 3],
            [2, 3, 4],
            [3, 4, 5],
            [4, 5, 6],
            [5, 6, 7],
            [6, 7, 8],
            [7, 8, 9],
            [8, 9, 10],
            [9, 1, 10],
            [10, 1, 2],
            [2, 12, 10],
            [4, 12, 2],
            [6, 12, 4],
            [8, 12, 6],
            [10, 12, 8]
        ];
        _pIcosahedron.setVertices(icosahedronVertices);
        _pIcosahedron.setFaces(icosahedronFaces);
        this.Icosahedron.setPolygonalModel(_pIcosahedron);
    }

    public getPolyhedron(index: number): Model3d | any {
        switch (index) {
            case 4: return this.Tetrahedron;
            case 5: return this.Octahedron;
            case 6: return this.Icosahedron;
            case 7: return this.Bipyramid;
            default: return -1;
        }
    }
}
