import { Matrix } from '../Matrix/Matrix';
import { WarframeModel, PolygonalModel, Model3d } from '../Model/Model3d';

export class Shapes3d {
    private Tetrahedron: Model3d;
    private Octahedron: Model3d;

    constructor() {
        // Tetrahedron
        this.Tetrahedron = new Model3d();
        let _pTetrahedron = new PolygonalModel(4, 4);
        let tetrahedronVertices = new Matrix(4, 4);
        tetrahedronVertices.cells = [
            [0, 1, 2, 1],
            [0, Math.sqrt(3), 0, Math.sqrt(3) / 3],
            [0, 0, 0, 4 * Math.sqrt(2) / 3],
            [1, 1, 1, 1]
        ];
        let tetrahedronFacets = new Matrix(4, 3);
        tetrahedronFacets.cells = [
            [1, 2, 3],
            [1, 2, 4],
            [2, 3, 4],
            [1, 3, 4]
        ];
        _pTetrahedron.setVertices(tetrahedronVertices);
        _pTetrahedron.setFacets(tetrahedronFacets);
        this.Tetrahedron.setPolygonalModel(_pTetrahedron);

        // Octahedron
        this.Octahedron = new Model3d();
        let _pOctahedron = new PolygonalModel(6, 8);
        let octahedronVertices = new Matrix(4, 6);
        octahedronVertices.cells = [
            [0, 0, 2, 2, 1, 1],
            [0, 2, 2, 0, 1, 1],
            [0, 0, 0, 0, 2, -2],
            [1, 1, 1, 1, 1, 1]
        ];
        let octahedronFacets = new Matrix(8, 3);
        octahedronFacets.cells = [
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
        _pOctahedron.setFacets(octahedronFacets);
        this.Octahedron.setPolygonalModel(_pOctahedron);
    }

    public getPolyhedron(index: number): Model3d | any {
        switch (index) {
            case 0: return this.Tetrahedron;
            case 1: return this.Octahedron;
            default: return -1;
        }
    }
}
