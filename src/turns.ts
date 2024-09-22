function arrayMove(arr: number[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function rotateFace(cube: number[][], faceIndex: number, dir: boolean) {
    if (dir) {
        //if dir, clockwise
        arrayMove(cube[faceIndex], 7, 0);
        arrayMove(cube[faceIndex], 7, 0);
    } else {
        //if not, cc
        arrayMove(cube[faceIndex], 0, 7);
        arrayMove(cube[faceIndex], 0, 7);
    }
}

function R(cube: number[][]) {
    rotateFace(cube, 2, true);
    for (let i = 0; i < 3; i++) {
        [cube[1][i + 2], cube[0][i + 2], cube[3][(i + 6) % 8], cube[5][i + 2]] =
            [
                cube[5][i + 2],
                cube[1][i + 2],
                cube[0][i + 2],
                cube[3][(i + 6) % 8],
            ];
    }
}

function U(cube: number[][]) {
    rotateFace(cube, 0, true);
    for (let i = 0; i < 3; i++) {
        [cube[1][i], cube[2][i], cube[3][i], cube[4][i]] = [
            cube[2][i],
            cube[3][i],
            cube[4][i],
            cube[1][i],
        ];
    }
}

function F(cube: number[][]) {
    rotateFace(cube, 1, true);
    for (let i = 0; i < 3; i++) {
        [cube[0][i + 4], cube[2][(i + 6) % 8], cube[5][i], cube[4][i + 2]] = [
            cube[4][i + 2],
            cube[0][i + 4],
            cube[2][(i + 6) % 8],
            cube[5][i],
        ];
    }
}

function L(cube: number[][]) {
    rotateFace(cube, 4, true);
    for (let i = 0; i < 3; i++) {
        [
            cube[0][(i + 6) % 8],
            cube[1][(i + 6) % 8],
            cube[5][(i + 6) % 8],
            cube[3][i + 2],
        ] = [
            cube[3][i + 2],
            cube[0][(i + 6) % 8],
            cube[1][(i + 6) % 8],
            cube[5][(i + 6) % 8],
        ];
    }
}

function D(cube: number[][]) {
    rotateFace(cube, 5, true);
    for (let i = 0; i < 3; i++) {
        [cube[1][i + 4], cube[2][i + 4], cube[3][i + 4], cube[4][i + 4]] = [
            cube[4][i + 4],
            cube[1][i + 4],
            cube[2][i + 4],
            cube[3][i + 4],
        ];
    }
}

function B(cube: number[][]) {
    rotateFace(cube, 3, true);
    for (let i = 0; i < 3; i++) {
        [cube[0][i], cube[4][(i + 6) % 8], cube[5][i + 4], cube[2][i + 2]] = [
            cube[2][i + 2],
            cube[0][i],
            cube[4][(i + 6) % 8],
            cube[5][i + 4],
        ];
    }
}

function x(cube: number[][]) {
    rotateFace(cube, 2, true); //rotating left...
    rotateFace(cube, 4, false); //...and right face

    rotateFace(cube, 0, true);
    rotateFace(cube, 0, true); //rotating top...
    rotateFace(cube, 3, true); //...and back face twice
    rotateFace(cube, 3, true);
    [cube[0], cube[3], cube[5], cube[1]] = [cube[1], cube[0], cube[3], cube[5]];
}

function y(cube: number[][]) {
    rotateFace(cube, 0, true);
    rotateFace(cube, 5, false);
    [cube[1], cube[2], cube[3], cube[4]] = [cube[2], cube[3], cube[4], cube[1]];
}

function z(cube: number[][]) {
    rotateFace(cube, 1, true);
    rotateFace(cube, 3, false);

    rotateFace(cube, 0, true);
    rotateFace(cube, 4, true);
    rotateFace(cube, 5, true);
    rotateFace(cube, 2, true);
    [cube[0], cube[2], cube[5], cube[4]] = [cube[4], cube[0], cube[2], cube[5]];
}

function M(cube: number[][]) {
    R(cube);
    L(cube);
    L(cube);
    L(cube);
    x(cube);
    x(cube);
    x(cube);
}

function E(cube: number[][]) {
    U(cube);
    D(cube);
    D(cube);
    D(cube);
    y(cube);
    y(cube);
    y(cube);
}

function S(cube: number[][]) {
    F(cube);
    F(cube);
    F(cube);
    B(cube);
    z(cube);
}

function r(cube: number[][]) {
    L(cube);
    x(cube);
}

function u(cube: number[][]) {
    D(cube);
    y(cube);
}

function f(cube: number[][]) {
    B(cube);
    z(cube);
}

function l(cube: number[][]) {
    R(cube);
    x(cube);
    x(cube);
    x(cube);
}

function d(cube: number[][]) {
    U(cube);
    y(cube);
    y(cube);
    y(cube);
}

function b(cube: number[][]) {
    F(cube);
    z(cube);
    z(cube);
    z(cube);
}

type turnsEnum =
    | "R"
    | "U"
    | "F"
    | "L"
    | "D"
    | "B"
    | "x"
    | "y"
    | "z"
    | "M"
    | "E"
    | "S"
    | "r"
    | "u"
    | "f"
    | "l"
    | "d"
    | "b";

export type { turnsEnum };

export default {
    arrayMove,
    rotateFace,
    R,
    U,
    F,
    L,
    D,
    B,
    x,
    y,
    z,
    M,
    E: (cube: number[][]) => E(cube),
    S,
    r,
    u,
    f,
    l,
    d,
    b,
};
