import { Matrix } from '../Matrix/Matrix';

export class AffineTransform3d {
    public static identity(): Matrix {
        let Identity = new Matrix(4, 4);
        Identity.cells = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        return Identity;
    }

    public static translation(x: number, y: number, z: number): Matrix {
        let Translation = new Matrix(4, 4);
        Translation.cells = [
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1]
        ];
        return Translation;
    }


    public static rotationOx(t: number): Matrix {
        let Rotation = new Matrix(4, 4);
        Rotation.cells = [
            [1, 0, 0, 0],
            [0, Math.cos(t), - Math.sin(t), 0],
            [0, Math.sin(t), Math.cos(t), 0],
            [0, 0, 0, 1]
        ];
        return Rotation;
    }

    public static rotationOy(t: number): Matrix {
        let Rotation = new Matrix(4, 4);
        Rotation.cells = [
            [Math.cos(t), 0, Math.sin(t), 0],
            [0, 1, 0, 0],
            [ - Math.sin(t), 0, Math.cos(t), 0],
            [0, 0, 0, 1]
        ];
        return Rotation;
    }

    public static rotationOz(t: number): Matrix {
        let Rotation = new Matrix(4, 4);
        Rotation.cells = [
            [Math.cos(t), - Math.sin(t), 0, 0],
            [Math.sin(t), Math.cos(t), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        return Rotation;
    }

    public static scaling(kx: number, ky: number, kz: number): Matrix {
        let Scaling = new Matrix(4, 4);
        Scaling.cells = [
            [kx, 0, 0, 0],
            [0, ky, 0, 0],
            [0, 0, kz, 0],
            [0, 0, 0, 1]
        ];
        return Scaling;
    }

    public static reflectionYZ(): Matrix {
        let Reflection = new Matrix(4, 4);
        Reflection.cells = [
            [-1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        return Reflection;
    }

    public static reflectionZX(): Matrix {
        let Reflection = new Matrix(4, 4);
        Reflection.cells = [
            [1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        return Reflection;
    }

    public static reflectionXY(): Matrix {
        let Reflection = new Matrix(4, 4);
        Reflection.cells = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1]
        ];
        return Reflection;
    }

    public static reflectionOx(): Matrix {
        let Reflection = new Matrix(4, 4);
        Reflection.cells = [
            [1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1]
        ];
        return Reflection;
    }

    public static reflectionOy(): Matrix {
        let Reflection = new Matrix(4, 4);
        Reflection.cells = [
            [-1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1]
        ];
        return Reflection;
    }

    public static reflectionOz(): Matrix {
        let Reflection = new Matrix(4, 4);
        Reflection.cells = [
            [-1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        return Reflection;
    }

    public static reflectionO(): Matrix {
        let Reflection = new Matrix(4, 4);
        Reflection.cells = [
            [-1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1]
        ];
        return Reflection;
    }
}
