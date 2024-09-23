import turns from "./turns";
import { turnsEnum } from "./turns";
import { notifyUser } from "./notifyUser";

type Cube = number[][];

const getNewCube: () => Cube = () =>
    Array.from({ length: 6 }, (_, i) => Array(9).fill(i));

const clearCube = (cube: Cube) => {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 9; j++) {
            cube[i][j] = i;
        }
    }
};

const colours = ["white", "green", "red", "blue", "orange", "yellow"];

var algDatabase: string[] = [];

const algsInputElement = document.getElementById(
    "algsInput"
) as HTMLTextAreaElement;

const loadAlgsFromInput = () => {
    algDatabase = algsInputElement.value
        .split("\n")
        .filter((s) => s.trim() != "");

    if (algDatabase.length == 0) {
        notifyUser("No algs loaded, try again", 2000);
        return false;
    }
    notifyUser(
        `${algDatabase.length} algs loaded, time to connect cube!`,
        2000
    );
    return true;
};

var currentAlg: string = "";

const isSolved = (cube: Cube) =>
    cube.every((face) => face.every((sticker) => sticker === face[0]));

function doAlg(cube: Cube, s: string) {
    let moves = s.trim().split(" "); //must be trimmed first for extra spaces that might cause trouble
    let move;
    for (const i in moves) {
        move = moves[i];
        if (move == "") continue;
        const turn = move[0] as turnsEnum;
        const turnFunction = turns[turn];
        turnFunction(cube);
        if (!move[1]) continue; //only one if no ', 2 or 3
        turnFunction(cube); //do second one
        if (move[1] == "2") continue; //stop if 2, ' or 3 should do another
        turnFunction(cube);
    }
    draw(cube);
}

function doTurn(cube: Cube, turnFunc: (cube: Cube) => void, amount: number) {
    for (let i = 0; i < amount; i++) {
        turnFunc(cube);
    }
    draw(cube);
    if (isSolved(cube)) {
        notifyUser("Solved! New alg in 0.5 sec", 500);
        setTimeout(() => {
            nextScramble(cube);
            draw(cube);
        }, 500);
    }
}

function setupAlg(cube: Cube, s: string, randomAufAndRot: boolean) {
    clearAndDrawCurrentCube(cube);
    if (randomAufAndRot) {
        randomRot(cube);
        randomAUF(cube);
    }
    let moves = s.trim().split(" "); //must be trimmed first for extra spaces that might cause trouble
    let move;
    for (let i = 0; i < moves.length; i++) {
        move = moves[moves.length - (i + 1)];
        if (move == "") continue;
        const turn = move[0] as turnsEnum;
        const turnFunction = turns[turn];
        turnFunction(cube);

        if (!move[1]) {
            turnFunction(cube);
            turnFunction(cube);
            continue;
        }
        if (move[1] == "'") {
            continue;
        }
        if (move[1] == "2") {
            turnFunction(cube);
            continue;
        }
    }
    if (randomAufAndRot) {
        randomAUF(cube);
    }
    draw(cube);
}

function clearAndDrawCurrentCube(cube: Cube) {
    clearCube(cube);
    draw(cube);
}

function nextScramble(cube: Cube) {
    currentAlg = algDatabase[Math.floor(Math.random() * algDatabase.length)];
    setupAlg(cube, currentAlg, true);
    notifyUser("");
}

const canvas = document.getElementById("cubeView") as HTMLCanvasElement;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const stickerSize = 80;

function drawSticker(x: number, y: number, colourChar: number) {
    ctx.beginPath();
    ctx.fillStyle = colours[colourChar];
    ctx.fillRect(x * stickerSize, y * stickerSize, stickerSize, stickerSize);
}

function drawGridLines() {
    ctx.lineWidth = 6;
    for (let i = 0; i <= canvas.height; i += stickerSize) {
        if (i == stickerSize * 3) {
            //no line between duplicate sticker
            ctx.moveTo(stickerSize, i);
            ctx.lineTo(canvas.width - stickerSize, i);
            ctx.stroke();
            continue;
        }
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    for (let i = 0; i <= canvas.width; i += stickerSize) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
}

function randomRot(cube: Cube) {
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
        turns.y(cube);
    }
}

function randomAUF(cube: Cube) {
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
        turns.U(cube);
    }
}

function draw(cube: Cube) {
    //clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // top face
    //first row
    drawSticker(1, 0, cube[0][0]);
    drawSticker(2, 0, cube[0][1]);
    drawSticker(3, 0, cube[0][2]);
    //second row
    drawSticker(1, 1, cube[0][7]);
    drawSticker(2, 1, cube[0][8]);
    drawSticker(3, 1, cube[0][3]);
    //third row
    drawSticker(1, 2, cube[0][6]);
    drawSticker(2, 2, cube[0][5]);
    drawSticker(3, 2, cube[0][4]);

    //front face
    //first row
    drawSticker(1, 3, cube[1][0]);
    drawSticker(2, 3, cube[1][1]);
    drawSticker(3, 3, cube[1][2]);
    //second row
    drawSticker(1, 4, cube[1][7]);
    drawSticker(2, 4, cube[1][8]);
    drawSticker(3, 4, cube[1][3]);
    //third row
    drawSticker(1, 5, cube[1][6]);
    drawSticker(2, 5, cube[1][5]);
    drawSticker(3, 5, cube[1][4]);

    //left face
    drawSticker(0, 0, cube[4][0]);
    drawSticker(0, 1, cube[4][1]);
    drawSticker(0, 2, cube[4][2]);
    drawSticker(0, 3, cube[4][2]); //same
    drawSticker(0, 4, cube[4][3]);
    drawSticker(0, 5, cube[4][4]);

    //right face
    drawSticker(4, 0, cube[2][2]);
    drawSticker(4, 1, cube[2][1]);
    drawSticker(4, 2, cube[2][0]);
    drawSticker(4, 3, cube[2][0]); //same
    drawSticker(4, 4, cube[2][7]);
    drawSticker(4, 5, cube[2][6]);

    drawGridLines();
}

export {
    doTurn,
    doAlg,
    setupAlg,
    clearAndDrawCurrentCube,
    nextScramble,
    draw,
    getNewCube,
    currentAlg,
    loadAlgsFromInput,
};
