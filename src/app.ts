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

connectButton.addEventListener("click", () => {
    connect();
    connectButton.blur();
});

(document.getElementById("loadAlgs") as HTMLButtonElement).addEventListener(
    "click",
    () => {
        const isSuccess = loadAlgsFromInput();
        if (isSuccess) {
            connectButton.disabled = false;
        }
    }
);

const onNextAlg = () => nextScramble(currentCube);

const onResetAlg = () => {
    if (currentAlg) {
        setupAlg(currentCube, currentAlg, false);
        notifyUser(currentAlg);
    }
};

(document.getElementById("nextAlg") as HTMLButtonElement).addEventListener(
    "click",
    onNextAlg
);

(document.getElementById("resetAlg") as HTMLButtonElement).addEventListener(
    "click",
    onResetAlg
);

document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") onNextAlg();
    else if (e.code === "Space") onResetAlg();
});

const currentCube = getNewCube();

draw(currentCube);
