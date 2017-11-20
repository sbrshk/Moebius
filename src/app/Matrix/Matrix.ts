export class Matrix {
    public rows: number;
    public cols: number;
    public cells: number[][];

    constructor (n: number, m: number) {
        this.rows = n;
        this.cols = m;
        this.cells = [];
    }

    public static sum(A: Matrix, B: Matrix): Matrix | any {
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

    public static diff(A: Matrix, B: Matrix): Matrix | any {
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

    public static scale(A: Matrix, k: number): Matrix {
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

    public static MatrixMatrixMultiply(A: Matrix, B: Matrix): Matrix | any {
        if (A.cols !== B.rows) return;
        // console.log(A.rows + ' x ' + A.cols);
        // console.log(B.rows + ' x ' + B.cols);
        let _rows = A.rows;
        let _cols = B.cols;
        // console.log(_rows + ' ' + _cols);
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
        // console.log(C.cells);
        return C;
    }
}
