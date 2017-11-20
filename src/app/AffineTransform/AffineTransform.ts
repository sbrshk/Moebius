import { Matrix } from '../Matrix/Matrix';

export class AffineTransform {
    public static identity(): Matrix {
        let Identity = new Matrix(3, 3);
        Identity.cells = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        return Identity;
    }

    public static translation(x: number, y: number): Matrix {
        let Translation = new Matrix(3, 3);
        Translation.cells = [
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1]
        ];
        return Translation;
    }

    public static rotationAngle(t: number): Matrix {
        let Rotation = new Matrix(3, 3);
        Rotation.cells = [
            [Math.cos(t), -Math.sin(t), 0],
            [Math.sin(t), Math.cos(t), 0],
            [0, 0, 1]
        ];
        return Rotation;
    }

    public static rotationCS(c: number, s: number): Matrix {
        let _h = Math.sqrt(c*c + s*s);
        let _cos = s / _h;
        let _sin = c / _h;
        let Rotation = new Matrix(3, 3);
        Rotation.cells = [
            [_cos, -_sin, 0],
            [_sin, _cos, 0],
            [0, 0, 1]
        ];
        return Rotation;
    }

    public static scaling(kx: number, ky: number): Matrix {
        let Scaling = new Matrix(3, 3);
        Scaling.cells = [
            [kx, 0, 0],
            [0, ky, 0],
            [0, 0, 1]
        ];
        return Scaling;
    }

    public static reflectionX(): Matrix {
        let Reflection = new Matrix(3, 3);
        Reflection.cells = [
            [1, 0, 0],
            [0, -1, 0],
            [0, 0, 1]
        ];
        return Reflection;
    }

    public static reflectionY(): Matrix {
        let Reflection = new Matrix(3, 3);
        Reflection.cells = [
            [-1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        return Reflection;
    }

    public static reflectionCenter(): Matrix {
        let Reflection = new Matrix(3, 3);
        Reflection.cells = [
            [-1, 0, 0],
            [0, -1, 0],
            [0, 0, 1]
        ];
        return Reflection;
    }
}
