import { Vector } from './Vector';

export class Matrix {
    public rows: number;
    public cols: number;
    public cells: number[][];

    constructor (n: number, m: number) {
        this.rows = n;
        this.cols = m;
        this.cells = [];
        for (let i = 0; i < m; i++) {
            this.cells[i] = [];
        }
    }

    public static sumMatrix(A: Matrix, B: Matrix): Matrix | any {
        if (A.rows !== B.rows || A.cols !== B.cols) return;
        let _rows = A.rows;
        let _cols = A.cols;
        let C = new Matrix(_rows, _cols);
        for (let i = 0; i < _rows; i++) {
            C.cells[i] = [];
            for (let j = 0; j < _cols; j++) {
                C.cells[i][j] = A.cells[i][j] + B.cells[i][j];
            }
        }
        return C;
    }

    public static diffMatrix(A: Matrix, B: Matrix): Matrix | any {
        if (A.rows !== B.rows || A.cols !== B.cols) return;
        let _rows = A.rows;
        let _cols = A.cols;
        let C = new Matrix(_rows, _cols);
        for (let i = 0; i < _rows; i++) {
            C.cells[i] = [];
            for (let j = 0; j < _cols; j++) {
                C.cells[i][j] = A.cells[i][j] - B.cells[i][j];
            }
        }
        return C;
    }

    public static scaleMatrix(A: Matrix, k: number): Matrix {
        let _rows = A.rows;
        let _cols = A.cols;
        let C = new Matrix(_rows, _cols);
        for (let i = 0; i < _rows; i++) {
            C.cells[i] = [];
            for (let j = 0; j < _cols; j++) {
                C.cells[i][j] = A.cells[i][j] * k;
            }
        }
        return C;
    }

    public static MatrixVectorMultiply(A: Matrix, B: Vector): Vector | any {
        if (A.cols !== B.dim) return;
        let C = new Vector(B.dim);
        for (let i = 0; i < B.dim; i++) {
            let c = 0;
            for (let j = 0; j < A.cols; j++) {
                c += A.cells[i][j] * B.elements[j];
            }
        }
        return C;
    }

    public static MatrixMatrixMultiply(A: Matrix, B: Matrix): Matrix | any {
        if (A.cols !== B.rows) return;
        let _rows = A.rows;
        let _cols = B.cols;
        let C = new Matrix(_rows, _cols);
        for (let i = 0; i < _rows; i++) {
            C.cells[i] = [];
            for (let j = 0; j < _cols; j++) {
                C.cells[i][j] = 0;
                for (let k = 0; k < _rows; k++) {
                    C.cells[i][j] += A.cells[i][k] * B.cells[k][j];
                }
            }
        }
        return C;
    }
}
