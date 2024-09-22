import {
    doTurn,
    nextScramble,
    setupAlg,
    currentAlg,
    getNewCube,
    loadAlgsFromInput,
    draw,
} from "./cube";
import turns from "./turns";
import { turnsEnum } from "./turns";
import { notifyUser } from "./notifyUser";

import { connectGanCube } from "gan-web-bluetooth";

const connect = async () => {
    var conn = await connectGanCube();

    notifyUser("Connected to cube", 2000);
    nextScramble(currentCube);

    conn.events$.subscribe((event) => {
        if (event.type == "FACELETS") {
            console.log("Cube facelets state", event.facelets);
        } else if (event.type == "MOVE") {
            const turn = ["U", "R", "F", "D", "L", "B"][
                event.face
            ] as turnsEnum;
            doTurn(currentCube, turns[turn], event.direction ? 3 : 1);
        }
    });

    await conn.sendCubeCommand({ type: "REQUEST_FACELETS" });
};

const connectButton = document.getElementById(
    "connectButton"
) as HTMLButtonElement;

connectButton.addEventListener("click", connect);

(document.getElementById("loadAlgs") as HTMLButtonElement).addEventListener(
    "click",
    () => {
        const isSuccess = loadAlgsFromInput();
        if (isSuccess) {
            connectButton.hidden = false;
        }
    }
);

document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") nextScramble(currentCube);
    else if (e.code === "Space") {
        if (currentAlg) {
            setupAlg(currentCube, currentAlg, false);
            notifyUser(currentAlg);
        }
    }
});

const currentCube = getNewCube();

draw(currentCube);
