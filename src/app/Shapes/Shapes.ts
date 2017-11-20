import { Matrix } from '../Matrix/Matrix';
import { Model } from '../Model/Model';

export class Shapes {
    private NeckerCube: Model;
    private PenroseTribar: Model;
    private TriangleSpidron: Model;
    private UnicursalHexagram: Model;

    constructor() {
        // Necker Cube
        this.NeckerCube = new Model(10, 13);
        let cubeVertices = new Matrix(3, 10);
        cubeVertices.cells = [
            [-1, 1, 1, -1, -3, 1, 3, 3, -1, -3],
            [-1, -1, 1, 1, -3, -3, -1, 3, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        let cubeEdges = new Matrix(13, 2);
        cubeEdges.cells = [
            [1, 7],
            [7, 8],
            [8, 9],
            [9, 1],
            [5, 6],
            [6, 7],
            [3, 10],
            [10, 5],
            [10, 9],
            [3, 8],
            [5, 1],
            [6, 7],
            [3, 6]
        ];
        this.NeckerCube.setVertices(cubeVertices);
        this.NeckerCube.setEdges(cubeEdges);

        // Penrose Tribar
        this.PenroseTribar = new Model(12, 12);
        let tribarVertices = new Matrix(3, 12);
        let _delta = Math.round(1 / Math.sqrt(5));
        tribarVertices.cells = [
            [-1, 0, 1, -2, 0.5, 1.5, -3.5, -0.5, 0.5, 3.5, 3, -3],
            [0, 2, 0, 0, 3, -1, -1, 4.5, 4.5, -1, -2, -2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        let tribarEdges = new Matrix(12, 2);
        tribarEdges.cells = [
            [1, 5],
            [2, 6],
            [3, 4],
            [4, 9],
            [5, 11],
            [6, 7],
            [7, 8],
            [8, 9],
            [9, 10],
            [10, 11],
            [11, 12],
            [12, 7]
        ];
        this.PenroseTribar.setVertices(tribarVertices);
        this.PenroseTribar.setEdges(tribarEdges);

        // Triangle Spidron
        this.TriangleSpidron = new Model(11, 11);
        let spidronVertices = new Matrix(3, 11);
        spidronVertices.cells = [
            [-2, 0, 2, 0, 1, 0.5, 0, 0.25, -0.25, -0.125, 0],
            [4, 8, 4, 4, 2, 3, 2, 2.5, 2.5, 2.75, 2.5],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        let spidronEdges = new Matrix(11, 2);
        spidronEdges.cells = [
            [1, 2],
            [2, 3],
            [3, 1],
            [3, 5],
            [5, 4],
            [5, 7],
            [7, 6],
            [7, 9],
            [9, 8],
            [9, 10],
            [10, 11]
        ];
        this.TriangleSpidron.setVertices(spidronVertices);
        this.TriangleSpidron.setEdges(spidronEdges);

        //Unicursal hexagram
        this.UnicursalHexagram = new Model(6, 6);
        let hexVertices = new Matrix(3, 6);
        hexVertices.cells = [
            [0, 3, 3, 0, -3, -3],
            [4, 2, -2, -4, -2, 2],
            [1, 1, 1, 1, 1, 1]
        ];
        let hexEdges = new Matrix(6, 2);
        hexEdges.cells = [
            [1, 3],
            [3, 6],
            [6, 4],
            [4, 2],
            [2, 5],
            [5, 1]
        ];
        this.UnicursalHexagram.setVertices(hexVertices);
        this.UnicursalHexagram.setEdges(hexEdges);
    }

    public getShape(index: Number): Model | any {
        switch (index) {
            case 0: return this.NeckerCube;
            case 1: return this.PenroseTribar;
            case 2: return this.TriangleSpidron;
            case 3: return this.UnicursalHexagram;
            default: return 0;
        }
    }
}
