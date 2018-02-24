// WARNING: DO NOT TOUCH THESE UNLESS YOU REALLY KNOW WHAT YOU ARE TRULY DOING!!
const EVS = {
    // This module's so easy, simple and small that violating DRY's ok inside
    isStart: data => data.tag === "start",
    isWin: data => data.tag === "win",
    startData: (difficulty, board, filledCoors) => {
        return { tag: "start", difficulty, board, filledCoors };
    },
    inputData: (x, y, char) => ({ tag: "input", x, y, char }),
    alertData: () => ({ tag: "alert" }),
    winData: () => ({ tag: "win" }),
    recEv: (evs, elapsedS, data) => { evs[elapsedS] = evs[elapsedS] || data; },
    playEv: (ev, domFn, setCharFn) => {
        if (!ev) return;
        const tag = ev.tag;
        if (tag === "input") return setCharFn(domFn(ev.y, ev.x), ev.char);
        // Both alertClose and EVS are globally static so this coupling's ok
        if (tag === "alert") document.getElementById("alertClose").onclick();
        //
    },
    isSame: (ev1, ev2) => {
        if (Object.keys(ev1).length !== Object.keys(ev2).length) return false;
        return Object.entries(ev1).every(([tag, val]) => val === ev2[tag]);
    }
    //
};
//
