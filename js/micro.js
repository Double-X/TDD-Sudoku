window.onload = () => {
    const _onPromptOk = filledCoorNo => {
        if (filledCoorNo < _min || filledCoorNo > _max) {
            _P_PROMPT_MSG.innerHTML = "Please enter the number of filled" +
                    ` coordinates that should be between ${_min} and ${_max}`;
            _changeVisibility("invisible", "visible", _DIV_OVERLAY);
            return _changeVisibility("invisible", "visible", _DIV_PROMPT);
        }
        const board = _newData(_difficulty, _board.bind(this, _difficulty));
        const filledCoors = _newData(_difficulty,
                    _filledCoors.bind(this, _difficulty, filledCoorNo));
        _changeVisibility("visible", "invisible", _P_PLAYING_DEMO);
        _render(_difficulty, board, filledCoors);
        _boardData = board, _filledCoorsData = filledCoors, _evs = {};
    }, _newData = (difficulty, dataSource) => {
        const size = Math.sqrt(DIFFICULTIES[difficulty].chars.length);
        const sizeList = Array(size).fill(-1);
        const charValSpacings = DIFFICULTIES[difficulty].charValSpacings;
        return dataSource(_combination(sizeList.map((element, i) => i), Math.
                floor(Math.random() * size)), _combination(sizeList.map((
                element, i) => i), Math.floor(Math.random() * size)), sizeList.
                map(() => _combination(sizeList.map((element, i) => i), Math.
                floor(Math.random() * size))), sizeList.map(() => _combination(
                sizeList.map((element, i) => i), Math.floor(Math.random() *
                size))), charValSpacings[Math.floor(Math.random() *
                charValSpacings.length)]);
    }, _combination = (elements, combinationNo) => {
        if (combinationNo === 1) return elements;
        const l = elements.length;
        if (combinationNo === _factorial(l)) return elements.slice().reverse();
        const newElements = elements.slice();
        return newElements.splice(Math.floor((combinationNo - 1) / _factorial(
                l - 1)), 1).concat(_combination(newElements, (combinationNo -
                1) % _factorial(l - 1) + 1));
    }, _factorial = no => no > 0 ? no * _factorial(no - 1) : 1;
    const _board = (difficulty, rowGroupCombination, colGroupCombination,
            rowInGroupCombinations, colInGroupCombinations, charValSpacing) => {
        const chars = DIFFICULTIES[difficulty].chars;
        const l = chars.length, size = Math.sqrt(l);
        const board = Array(l).fill("").map((element, rowIndex, lengthList) =>
                lengthList.map((element, colIndex) => chars[
                    (Math.floor(rowIndex / size) + size * (rowIndex % size) +
                            colIndex) * charValSpacing % l
                ])
        );
        return _reversedAxis(_swappedBoardPortions(_reversedAxis(
                _swappedBoardPortions(board, size, rowGroupCombination,
                rowInGroupCombinations)), size, colGroupCombination,
                colInGroupCombinations));
    }, _swappedBoardPortions = (portions, size, portionGroupCombination,
            portionInGroupCombinations) => {
        return portions.map((portion, portionIndex, board) => board[
            portionGroupCombination.indexOf(Math.floor(portionIndex / size)) *
                    size + portionIndex % size
        ]).map((portion, portionIndex, board) => board[
            portionIndex + portionInGroupCombinations[Math.floor(portionIndex /
                    size)][portionIndex % size] - portionIndex % size
        ]);
    }, _reversedAxis = board => Array(board.length).fill("").map((primaryAxis,
            primaryIndex, lengthList) => lengthList.map((secondaryAxis,
            secondaryIndex) => board[secondaryIndex][primaryIndex]));
    const _filledCoors = (difficulty, filledCoorNo, rowGroupCombination,
            colGroupCombination, rowInGroupCombinations,
            colInGroupCombinations, charValSpacing) => {
        const l = DIFFICULTIES[difficulty].chars.length, size = Math.sqrt(l);
        const basefilledCoorRowLength = Math.floor(filledCoorNo / l);
        const filledCoors = Array(l).fill({}).reduce((
                accumFilledCoors, element, rowIndex) => {
            const minBaseColIndex = rowIndex % size * size + Math.floor(
                    rowIndex / size);
            const filledCoorNoInRow = rowIndex < filledCoorNo % l ?
                    basefilledCoorRowLength + 1 : basefilledCoorRowLength;
            return accumFilledCoors.concat(Array(filledCoorNoInRow).fill({}).
                    map((element, filledCoorIndexInRow) => ({
                rowIndex,
                colIndex: (minBaseColIndex + filledCoorIndexInRow *
                        charValSpacing) % l
            })));
        }, []);
        return _reversedCoors(_swappedPortions(_reversedCoors(_swappedPortions(
                filledCoors, size, rowGroupCombination,
                rowInGroupCombinations)), size, colGroupCombination,
                colInGroupCombinations));
    }, _swappedPortions = (filledCoors, size, portionGroupCombination,
            portionInGroupCombinations) => {
        return filledCoors.map(filledCoor => ({
            rowIndex: filledCoor.rowIndex +
                    _portionGroupSwapOffset(size, portionGroupCombination,
                      Math.floor(filledCoor.rowIndex / size)),
            colIndex: filledCoor.colIndex
        })).map(filledCoor => ({
            rowIndex: filledCoor.rowIndex + _portionInGroupSwapOffset(
                portionInGroupCombinations[Math.floor(filledCoor.rowIndex /
                size)], filledCoor.rowIndex % size),
            colIndex: filledCoor.colIndex
        }));
    }, _portionGroupSwapOffset = (size, portionGroupCombination,
              origGroupNo) => (portionGroupCombination.indexOf(origGroupNo) -
              origGroupNo) * size, _portionInGroupSwapOffset = (
            portionInGroupCombinations, origNoInGroup) =>
        portionInGroupCombinations.indexOf(origNoInGroup) - origNoInGroup;
    const _reversedCoors = filledCoors => filledCoors.map(filledCoor => (
        { rowIndex: filledCoor.colIndex, colIndex: filledCoor.rowIndex }));
    const _render = (difficulty, board, filledCoors) => {
        document.getElementById("board").innerHTML = "";
        const oninput = (input, x, y, callback, errback) => {
            _evs[_elapsedS()] =
                    _evs[_elapsedS()] || { tag: "input", x, y, char: input };
            const l = DIFFICULTIES[difficulty].chars.length;
            const size = Math.sqrt(l);
            const inputViolations = _inputViolations(difficulty, input, _row(
                l, y), Array(l).fill("").map((element, rowIndex) => {
                return _dom(rowIndex, x).value.toUpperCase();
            }), Array(size).fill("").reduce((
                    accumGrid, element, rowIndexOffset, sizeList) => {
                return accumGrid.concat(sizeList.map((
                        element, colIndexOffset) => {
                    return _dom(y - y % size + rowIndexOffset, x - x % size +
                            colIndexOffset).value.toUpperCase();
                }))}, []));
            if (inputViolations.length > 0) {
                errback();
                return _show(inputViolations.join("\n"));
            }
            callback();
            if (Array(l).fill(l).map(_row).every(row => row.every(char =>
                    char.length > 0))) {
                _show("You've finished this board!");
                if (DIFFICULTIES[_difficulty] && _boardData.length > 0 &&
                        _filledCoorsData.length > 0) {
                    const evsCopy = Object.assign({}, _evs);
                    const difficulty = _difficulty
                    const board = _boardData, filledCoors = _filledCoorsData;
                    const a = document.createElement('a'), contents =
                            { evs: evsCopy, difficulty, board, filledCoors };
                    a.download = `D_${difficulty}_FCN_${filledCoors.length}_` +
                            `S_${_elapsedS()}`, a.href = window.URL.
                            createObjectURL(new Blob(
                            [JSON.stringify(contents)], { type: "text/json" }));
                    a.dataset.downloadurl = ["text/json", a.download, a.href].
                            join(":");
                    const ev = document.createEvent('MouseEvents');
                    ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0,
                            0, false, false, false, false, 0, null);
                    a.dispatchEvent(ev);
                }
            }
        };
        Array(board.length).fill("").forEach((
                element, rowIndex, lengthList) => {
            const row = document.createElement("div");
            row.id = "row" + rowIndex;
            lengthList.forEach((col, colIndex) => {
                const sq = document.createElement("input");
                sq.id = "sq" + rowIndex + "_" + colIndex;
                if (filledCoors.some(filledCoor =>
                      filledCoor.rowIndex === rowIndex &&
                      filledCoor.colIndex === colIndex)) {
                  sq.value = board[rowIndex][colIndex], sq.readOnly = true;
                  sq.classList.add("fixedSq");
                } else {
                    sq.oninput = () => {
                        const char = sq.value.toUpperCase();
                        const setChar = _setChar.bind(this, sq);
                        oninput(char, colIndex, rowIndex, setChar.bind(this,
                                char), setChar.bind(this, ""));
                    };
                    sq.classList.add("sq");
                }
                row.appendChild(sq);
            });
            document.getElementById("board").appendChild(row);
        });
        document.getElementById("validChars").innerHTML = "The list of " +
                "valid characters are: " + DIFFICULTIES[difficulty].chars;
        _P_TIMER_TXT.innerHTML = "0seconds";
        if (_timerId !== 0) clearInterval(_timerId);
        _timerId = setInterval(() => {
            _P_TIMER_TXT.innerHTML = ((+_elapsedS() * 1000 + 10) / 1000.0).
                    toFixed(2) + "seconds";
        }, 10);
    },  _inputViolations = (difficulty, input, row, col, grid) => {
        if (input.length <= 0) return [];
        const charViolation = !DIFFICULTIES[difficulty].chars.includes(input) ?
                ["This input's invalid in this difficulty!"] : [];
        if (charViolation.length > 0) return charViolation;
        return (row.filter(char => input === char).length > 1 ?
                ["This input duplicates with another one in the same row!"] :
                []).concat(col.filter(char => input === char).length > 1 ? [
                    "This input duplicates with another one in the same column!"
                ] : []).concat(grid.filter(char => input === char).length > 1 ?
                ["This input duplicates with another one in the same grid!"] :
                []);
    }, _row = (l, rowIndex) => Array(l).fill("").map((element, colIndex) => {
        return _dom(rowIndex, colIndex).value.toUpperCase();
    }), _dom = (rowIndex, colIndex) => {
        return document.getElementById("sq" + rowIndex + "_" + colIndex);
    }, _setChar = (dom, newChar) => {
        const oldChar = dom.value.toUpperCase();
        dom.value = newChar;
        const oninput = dom.oninput;
        if (oninput && oldChar !== newChar) oninput();
    }, _elapsedS = () => _P_TIMER_TXT.innerHTML.replace("seconds", "");
    const _changeVisibility = (oldVisibility, newVisibility, dom) => {
        const classList = dom.classList;
        classList.remove(oldVisibility);
        classList.add(newVisibility);
    }, _show = msg => {
        _changeVisibility("invisible", "visible", _DIV_OVERLAY);
        _changeVisibility("invisible", "visible", _DIV_ALERT);
        document.getElementById("alertMsg").innerHTML = msg;
    }, _BTN_ALERT_CLOSE = document.getElementById("alertClose");
    const _DIV_ALERT = document.getElementById("alert");
    const _DIV_OVERLAY = document.getElementById("overlay");
    const _DIV_PROMPT = document.getElementById("prompt");
    const _INPUT_PROMPT = document.getElementById("promptInput");
    const _P_PLAYING_DEMO = document.getElementById("playingDemo");
    const _P_PROMPT_MSG = document.getElementById("promptMsg");
    const _P_TIMER_TXT = document.getElementById("timerTxt");
    let _boardData = [], _filledCoorsData = [], _evs = {};
    let _difficulty = "", _min = _max = _playerId = _timerId = 0;
    Object.keys(DIFFICULTIES).forEach(difficulty => {
        const l = DIFFICULTIES[difficulty].chars.length;
        document.getElementById(difficulty).onclick = () => {
             _difficulty = difficulty, _min = l, _max = l * (l - 2);
            _onPromptOk(-1);
        };
    });
    _BTN_ALERT_CLOSE.onclick = () => {
        document.getElementById("alertMsg").innerHTML = "";
        _changeVisibility("visible", "invisible", _DIV_ALERT);
        _changeVisibility("visible", "invisible", _DIV_OVERLAY);
        _evs[_elapsedS()] = _evs[_elapsedS()] || { tag: "alert" };
    }, document.getElementById("playDemo").onchange = () => {
        const fileReader = new FileReader();
        fileReader.onerror = msg => _show("Failed to load the demo, please " +
                "try again.\nReasons of failure:\n" + msg);
        fileReader.onload = () => {
            const { evs, difficulty, board, filledCoors } = JSON.parse(
                    fileReader.result);
            _boardData = [], _filledCoorsData = [], _evs = {};
            _changeVisibility("invisible", "visible", _P_PLAYING_DEMO);
            _render(difficulty, board, filledCoors);
            if (_playerId !== 0) clearInterval(_playerId);
            _playerId = setInterval(() => {
                const ev = evs[_elapsedS()];
                if (!ev) return;
                const tag = ev.tag;
                if (tag === "input") return _setChar(_dom(ev.y, ev.x), ev.char);
                if (tag === "alert") _BTN_ALERT_CLOSE.onclick();
            }, 10);
        };
        fileReader.readAsText(document.getElementById("playDemo").files[0]);
    }, document.getElementById("promptClose").onclick = () => {
        const input = _INPUT_PROMPT.value;
        _INPUT_PROMPT.value = _P_PROMPT_MSG.innerHTML = "";
        _changeVisibility("visible", "invisible", _DIV_PROMPT);
        _changeVisibility("visible", "invisible", _DIV_OVERLAY);
        _onPromptOk(input);
    }, document.getElementById("timerVisibility").onchange = () =>
            document.getElementById("timerVisibility").checked ?
            _changeVisibility("invisible", "visible", _P_TIMER_TXT) :
            _changeVisibility("visible", "invisible", _P_TIMER_TXT);
    document.getElementById("easy").onclick();
}, DIFFICULTIES = {
    relaxed: { chars: ["0", "1", "2", "3"], charValSpacings: [1] }, easy: {
        chars: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
        charValSpacings: [1, 2, 4]
    }, normal: { chars: [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C",
            "D", "E", "F"
        ], charValSpacings: [1, 3, 5, 7] }, hard: { chars: [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C",
            "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"
        ], charValSpacings: [1, 2, 3, 4, 6, 7, 8, 9, 11, 12] }, insane: {
        chars: [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C",
            "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
            "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ], charValSpacings: [1, 5, 7, 11, 13, 17]
    }
};
