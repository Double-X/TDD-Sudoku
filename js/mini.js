const CompositionRoot = () => {
    const _INPUT_PLAY_DEMO = document.getElementById("playDemo");
    const _FC_GAME = FCGame(FMCompositionRoot(), FVCompositionRoot());
    document.getElementById("relaxed").onclick = _FC_GAME.onPlayRelaxedGame;
    document.getElementById("easy").onclick = _FC_GAME.onPlayEasyGame;
    document.getElementById("normal").onclick = _FC_GAME.onPlayNormalGame;
    document.getElementById("hard").onclick = _FC_GAME.onPlayHardGame;
    document.getElementById("insane").onclick = _FC_GAME.onPlayInsaneGame;
    _INPUT_PLAY_DEMO.onchange =
            _FC_GAME.onPlayDemo.bind(this, _INPUT_PLAY_DEMO);
    return _FC_GAME.onPlayEasyGame;
}, FMCompositionRoot = () => {
    const _FM_JSON_IO = FMJSONIO();
    const _FM_NEW_DATA = FMNewData(FMPickedCombination());
    return FMAPIs(FMFilledCoorNoMinMax(), FMInputViolations(), FMIsWon(),
            _FM_JSON_IO, FMNewBoard(FMBoard(FMBaseBoard()), _FM_NEW_DATA),
            FMNewFilledCoors(FMFilledCoors(FMBaseFilledCoors()), _FM_NEW_DATA),
            FMRecDemo(_FM_JSON_IO));
}, FVCompositionRoot = () => {
    const _FV_RENDER_DOMS = FVRenderDoms(), _FV_RENDERED_DOMS =
            FVRenderedDoms(), _FV_RENDER_SQ_PARAMS = FVRenderSqParams(
            _FV_RENDER_DOMS, _FV_RENDERED_DOMS), _FV_VISIBILITY =
            FVVisibility(), _FV_TIMER = FVTimer(document.getElementById(
            "timerVisibility"), document.getElementById("timerTxt"),
            _FV_RENDER_DOMS, _FV_RENDERED_DOMS, _FV_VISIBILITY);
    return FVRenderBoard.bind(this, document.getElementById("playingDemo"),
            document.getElementById("validChars"), FVRenderedSqs(
            _FV_RENDER_SQ_PARAMS), FVRenderSqs(document.getElementById(
            "board"), _FV_RENDER_DOMS, FVRenderedFixedSq(_FV_RENDER_SQ_PARAMS),
            FVRenderedSq(_FV_RENDER_SQ_PARAMS)), _FV_RENDER_DOMS, FVPlayDemo(
            _FV_RENDER_SQ_PARAMS, _FV_TIMER), FVShowMsg.bind(this, document.
            getElementById("alertClose"), document.getElementById(
            "promptClose"), document.getElementById("alert"), document.
            getElementById("overlay"), document.getElementById("prompt"),
            document.getElementById("promptInput"), document.getElementById(
            "alertMsg"), document.getElementById("promptMsg"), _FV_RENDER_DOMS,
            _FV_RENDERED_DOMS, _FV_VISIBILITY), _FV_TIMER, _FV_VISIBILITY);
}, FMBaseBoard = () => (difficulty, charValSpacing) => {
    const chars = FMLAS.chars(difficulty), l = FMLAS.l(difficulty);
    const size = FMLAS.size(l);
    return Array(l).fill("").map((element, rowIndex, lengthList) =>
            lengthList.map((element, colIndex) => chars[
                (FMLAS.portionGroupIndex(rowIndex, size) + size * FMLAS.
                        portionIndexInGroup(rowIndex, size) + colIndex) *
                        charValSpacing % l
            ])
    );
}, FMBoard = FM_BASE_BOARD => {
    const _swappedPortions = (portions, size, portionGroupCombination,
            portionInGroupCombinations) => {
        return portions.map((portion, portionIndex, board) => board[
            portionGroupCombination.indexOf(FMLAS.portionGroupIndex(
                    portionIndex, size)) * size + FMLAS.portionIndexInGroup(
                    portionIndex, size)
        ]).map((portion, portionIndex, board) => board[
            portionIndex + portionInGroupCombinations[FMLAS.portionGroupIndex(
                portionIndex, size)
            ][FMLAS.portionIndexInGroup(portionIndex, size)] - FMLAS.
                    portionIndexInGroup(portionIndex, size)
        ]);
    }, _reversedAxis = board => Array(board.length).fill("").map((
                primaryAxis, primaryIndex, lengthList) => lengthList.map((
                secondaryAxis, secondaryIndex) =>
                board[secondaryIndex][primaryIndex]));
    return (difficulty, rowGroupCombination, colGroupCombination,
            rowInGroupCombinations, colInGroupCombinations, charValSpacing) => {
        const board = FM_BASE_BOARD(difficulty, charValSpacing);
        const size = FMLAS.size(board.length);
        return _reversedAxis(_swappedPortions(_reversedAxis(_swappedPortions(
                board, size, rowGroupCombination, rowInGroupCombinations)),
                size, colGroupCombination, colInGroupCombinations));
    };
}, FMNewBoard = (FM_BOARD, FM_NEW_DATA) =>
        difficulty => FM_NEW_DATA(difficulty, FM_BOARD.bind(this, difficulty));
const FMBaseFilledCoors = () => (difficulty, filledCoorNo, charValSpacing) => {
    const l = FMLAS.l(difficulty), size = FMLAS.size(l);
    const basefilledCoorRowLength = Math.floor(filledCoorNo / l);
    return Array(l).fill({}).reduce((accumFilledCoors, element, rowIndex) => {
        const filledCoorNoInRow = rowIndex < filledCoorNo % l ?
                basefilledCoorRowLength + 1 : basefilledCoorRowLength;
        return accumFilledCoors.concat(Array(filledCoorNoInRow).fill({}).map((
                element, filledCoorIndexInRow) => ({
            rowIndex,
            colIndex: (FMLAS.portionIndexInGroup(rowIndex, size) * size + FMLAS.
                    portionGroupIndex(rowIndex, size) + filledCoorIndexInRow *
                    charValSpacing) % l
        })));
    }, []);
}, FMFilledCoors = FM_BASE_FILLED_COORS => {
    const _swappedPortions = (filledCoors, size, portionGroupCombination,
            portionInGroupCombinations) => {
        return filledCoors.map(filledCoor => ({
            rowIndex: filledCoor.rowIndex +
                    _portionGroupSwapOffset(size, portionGroupCombination,
                      FMLAS.portionGroupIndex(filledCoor.rowIndex, size)),
            colIndex: filledCoor.colIndex
        })).map(filledCoor => ({
            rowIndex: filledCoor.rowIndex + _portionInGroupSwapOffset(
                portionInGroupCombinations[FMLAS.portionGroupIndex(filledCoor.
                rowIndex, size)], FMLAS.portionIndexInGroup(filledCoor.
                rowIndex, size)),
            colIndex: filledCoor.colIndex
        }));
    }, _portionGroupSwapOffset = (size, portionGroupCombination,
              origGroupNo) => (portionGroupCombination.indexOf(origGroupNo) -
              origGroupNo) * size, _portionInGroupSwapOffset = (
            portionInGroupCombinations, origNoInGroup) =>
        portionInGroupCombinations.indexOf(origNoInGroup) - origNoInGroup;
    const _reversedCoors = filledCoors => filledCoors.map(filledCoor => (
        { rowIndex: filledCoor.colIndex, colIndex: filledCoor.rowIndex }));
    return (difficulty, filledCoorNo, rowGroupCombination, colGroupCombination,
            rowInGroupCombinations, colInGroupCombinations, charValSpacing) => {
        const size = FMLAS.size(FMLAS.l(difficulty));
        return _reversedCoors(_swappedPortions(_reversedCoors(_swappedPortions(
                FM_BASE_FILLED_COORS(difficulty, filledCoorNo, charValSpacing),
                size, rowGroupCombination, rowInGroupCombinations)), size,
                colGroupCombination, colInGroupCombinations));
    };
}, FMNewFilledCoors = (FM_FILLED_COORS, FM_NEW_DATA) =>
    (difficulty, filledCoorNo) => FM_NEW_DATA(difficulty,
                FM_FILLED_COORS.bind(this, difficulty, filledCoorNo));
const FMAPIs = (FM_FILLED_COOR_NO_MIN_MAX, FM_INPUT_VIOLATIONS, FM_IS_WON,
        FM_JSON_IO, FM_NEW_BOARD, FM_NEW_FILLED_COORS, FM_REC_DEMO) => ({
    filledCoorNoMinMax: FM_FILLED_COOR_NO_MIN_MAX,
    inputViolations: FM_INPUT_VIOLATIONS, isWon: FM_IS_WON,
    importJSON: FM_JSON_IO.importJSON, newBoard: FM_NEW_BOARD,
    newFilledCoors: FM_NEW_FILLED_COORS, ...FM_REC_DEMO
}), FMFilledCoorNoMinMax = () => difficulty => {
    const l = FMLAS.l(difficulty);
    return { min: l, max: l * (l - 2) };
}, FMInputViolations = () => (difficulty, input, row, col, grid) => {
    if (input.length <= 0) return [];
    const charViolation = !FMLAS.chars(difficulty).includes(input) ?
            [INPUT_CHAR_VIOLATION] : [];
    if (charViolation.length > 0) return charViolation;
    return (row.filter(char => input === char).length > 1 ?
            [INPUT_ROW_VIOLATION] : []).concat(col.filter(char => input ===
            char).length > 1 ? [INPUT_COL_VIOLATION] : []).concat(grid.filter(
            char => input === char).length > 1 ? [INPUT_GRID_VIOLATION] : []);
}, FMIsWon = () => {
    return board => board.every(row => row.every(char => char.length > 0));
}, FMJSONIO = () => ({
    exportJSON: (name, contents) => {
        const a = document.createElement('a');
        a.download = name + ".json", a.href = window.URL.createObjectURL(
                new Blob([JSON.stringify(contents)], { type: "text/json" }));
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        const ev = document.createEvent('MouseEvents');
        ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false,
                false, false, false, 0, null);
        a.dispatchEvent(ev);
    }, importJSON: (file, callback, errback) => {
        const fileReader = new FileReader();
        fileReader.onerror = errback;
        fileReader.onload = () => callback(JSON.parse(fileReader.result));
        fileReader.readAsText(file);
    }
}), FMNewData = FM_PICKED_COMBINATION => (difficulty, dataSource) => {
    const size = FMLAS.size(FMLAS.l(difficulty));
    const sizeList = Array(size).fill(-1);
    const charValSpacings = DIFFICULTIES[difficulty].charValSpacings;
    return dataSource(FM_PICKED_COMBINATION(sizeList.map((element, i) => i),
            Math.floor(Math.random() * size)), FM_PICKED_COMBINATION(sizeList.
            map((element, i) => i), Math.floor(Math.random() * size)), sizeList.
            map(() => FM_PICKED_COMBINATION(sizeList.map((element, i) => i),
            Math.floor(Math.random() * size))), sizeList.map(() =>
            FM_PICKED_COMBINATION(sizeList.map((element, i) => i), Math.floor(
            Math.random() * size))), charValSpacings[Math.floor(Math.random() *
            charValSpacings.length)]);
}, FMPickedCombination = () => {
    const combination = (elements, combinationNo) => {
        if (combinationNo === 1) return elements;
        const l = elements.length;
        if (combinationNo === _factorial(l)) return elements.slice().reverse();
        const newElements = elements.slice();
        return newElements.splice(Math.floor((combinationNo - 1) / _factorial(
                l - 1)), 1).concat(combination(newElements, (combinationNo -
                1) % _factorial(l - 1) + 1));
    }, _factorial = no => no > 0 ? no * _factorial(no - 1) : 1;
    return combination;
}, FMRecDemo = FM_JSON_IO => {
    const onStart = (difficulty, board, filledCoors) => {
        _recEv(0, EVS.startData(difficulty, board, filledCoors));
    }, _recEv = (elapsedS, data) => _REC_EV_GEN.next({ elapsedS, data });
    function * _recEvGen() {
        const evs = {}, saveDemoGen = _saveDemoGen(evs);
        saveDemoGen.next();
        while (true) {
            const { elapsedS, data } = yield;
            EVS.isStart(data) || EVS.isWin(data) ? saveDemoGen.next(
                    { elapsedS, data }) : EVS.recEv(evs, elapsedS, data);
        }
    };
    function * _saveDemoGen(evs) {
        let difficulty = "", board = [], filledCoors = [];
        while (true) {
            const { elapsedS, data } = yield;
            if (EVS.isStart(data)) {
                Object.keys(evs).forEach(key => delete evs[key]);
                difficulty = data.difficulty;
                board = data.board, filledCoors = data.filledCoors;
            } else if (!_isInvalid(difficulty, board, filledCoors)) {
                const evsCopy = Object.assign({}, evs);
                FM_JSON_IO.exportJSON(["D", difficulty, "FCN", filledCoors.
                        length, "S", elapsedS].join("_"),
                        { evs: evsCopy, difficulty, board, filledCoors });
            }
        }
    };
    const _isInvalid = (difficulty, board, filledCoors) => {
        return !DIFFICULTIES[difficulty] || board.length <= 0 ||
                filledCoors.length <= 0;
    }, _REC_EV_GEN = _recEvGen();
    _REC_EV_GEN.next();
    return {
        onStart, onMarkPlayDemo: () => onStart("", [], []),
        onRecInput: (elapsedS, x, y, char) => {
            _recEv(elapsedS, EVS.inputData(x, y, char));
        }, onAlertOk: elapsedS => _recEv(elapsedS, EVS.alertData()),
        onWin: elapsedS => _recEv(elapsedS, EVS.winData())
    };
}, FVRenderedFixedSq = FV_RENDER_SQ_PARAMS => (char, rowIndex, colIndex) => {
    const sq = FV_RENDER_SQ_PARAMS.newDom(rowIndex, colIndex);
    FV_RENDER_SQ_PARAMS.setReadOnlyChar(sq, char);
    sq.classList.add("fixedSq");
    return sq;
}, FVRenderedSq = FV_RENDER_SQ_PARAMS => (callback, rowIndex, colIndex) => {
    const sq = FV_RENDER_SQ_PARAMS.newDom(rowIndex, colIndex);
    FV_RENDER_SQ_PARAMS.setInputListener(sq, () => {
        const char = FV_RENDER_SQ_PARAMS.char(sq);
        const setChar = FV_RENDER_SQ_PARAMS.setChar.bind(this, sq);
        callback(char, colIndex,
                rowIndex, setChar.bind(this, char), setChar.bind(this, ""));
    });
    sq.classList.add("sq");
    return sq;
}, FVRenderedSqs = FV_RENDER_SQ_PARAMS => {
    const row = (l, rowIndex) => Array(l).fill("").map((element, colIndex) => {
        return FV_RENDER_SQ_PARAMS.char(
                FV_RENDER_SQ_PARAMS.dom(rowIndex, colIndex));
    }), col = (l, colIndex) => Array(l).fill("").map((element, rowIndex) => {
        return FV_RENDER_SQ_PARAMS.char(
                FV_RENDER_SQ_PARAMS.dom(rowIndex, colIndex));
    }), grid = (size, rowIndex, colIndex) => Array(size).fill("").reduce((
            accumGrid, element, rowIndexOffset, sizeList) => {
        return accumGrid.concat(sizeList.map((element, colIndexOffset) => {
            return FV_RENDER_SQ_PARAMS.char(FV_RENDER_SQ_PARAMS.dom(
                    rowIndex - FMLAS.portionIndexInGroup(rowIndex, size) +
                    rowIndexOffset, colIndex - FMLAS.portionIndexInGroup(
                    colIndex, size) + colIndexOffset));
        }))}, []), board = l => Array(l).fill(l).map(row);
    return { row, col, grid, board };
}, FVRenderSqParams = (FV_RENDER_DOMS, FV_RENDERED_DOMS) => {
    const domId = (rowIndex, colIndex) => "sq" + rowIndex + "_" + colIndex;
    const char = dom => FV_RENDERED_DOMS.getProp(dom, "value").toUpperCase();
    return {
        newDom: (rowIndex, colIndex) => {
            const sq = document.createElement("input");
            FV_RENDER_DOMS.setProp(sq, "id", domId(rowIndex, colIndex));
            return sq;
        }, setInputListener: (dom, oninput) => {
            FV_RENDER_DOMS.setProp(dom, "oninput", oninput);
        }, domId, dom: (rowIndex, colIndex) => {
            return FV_RENDERED_DOMS.callFn(
                    document, "getElementById", [domId(rowIndex, colIndex)]);
        }, char, setChar: (dom, newChar) => {
            const oldChar = char(dom);
            FV_RENDER_DOMS.setProp(dom, "value", newChar);
            const oninput = FV_RENDERED_DOMS.getProp(dom, "oninput");
            if (oninput && oldChar !== newChar) oninput();
        }, setReadOnlyChar: (dom, char) => {
            FV_RENDER_DOMS.setProp(dom, "value", char);
            FV_RENDER_DOMS.setProp(dom, "readOnly", true);
        }
    }
}, FVRenderSqs = (
        DIV_BOARD, FV_RENDER_DOMS, FV_RENDERED_FIXED_SQ, FV_RENDERED_SQ) => {
    const _renderedSq = (
            board, filledCoors, callback, rowIndex, row, col, colIndex) => {
        if (filledCoors.some(filledCoor =>
                filledCoor.rowIndex === rowIndex &&
                filledCoor.colIndex === colIndex)) {
            return FV_RENDERED_FIXED_SQ(
                    board[rowIndex][colIndex], rowIndex, colIndex);
        }
        return FV_RENDERED_SQ(callback, rowIndex, colIndex);
    };
    return (board, filledCoors, callback) => {
        FV_RENDER_DOMS.setProp(DIV_BOARD, "innerHTML", "");
        Array(board.length).fill("").forEach((
                element, rowIndex, lengthList) => {
            const row = document.createElement("div");
            FV_RENDER_DOMS.setProp(row, "id", "row" + rowIndex);
            lengthList.forEach((col, colIndex) => {
                FV_RENDER_DOMS.callFn(row, "appendChild", [
                    _renderedSq(board, filledCoors, callback, rowIndex, row,
                            col, colIndex)
                ]);
            });
            FV_RENDER_DOMS.callFn(DIV_BOARD, "appendChild", [row]);
        });
    };
}, FVPlayDemo = (FV_RENDER_SQ_PARAMS, FV_TIMER) => {
    function * _startGen() {
        while (true) {
            const evs = yield, playerId = setInterval(() => {
                EVS.playEv(evs[FV_TIMER.elapsedS()], FV_RENDER_SQ_PARAMS.dom,
                        FV_RENDER_SQ_PARAMS.setChar);
            }, 10);
            yield;
            clearInterval(playerId);
        }
    };
    const _START_GEN = _startGen();
    return evs => {
        _START_GEN.next(evs);
        _START_GEN.next(evs);
    };
}, FVRenderBoard = (P_PLAYING_DEMO, P_VALID_CHARS, FV_RENDERED_SQS,
        FV_RENDER_SQS, FV_RENDER_DOMS, FV_PLAY_DEMO, FVShowMsg, FV_TIMER,
        FV_VISIBILITY, ON_PROMPT_OK, ON_PRE_INPUT_COOR, ON_ALERT_OK,
        ON_POST_INPUT_COOR) => {
    const _render = (difficulty, board, filledCoors) => {
        FV_RENDER_SQS(board, filledCoors, (input, x, y, callback, errback) => {
            ON_PRE_INPUT_COOR(difficulty, inputViolations => {
                if (inputViolations.length > 0) {
                    errback();
                    return _FV_SHOW_MSG.showInputViolations(inputViolations);
                }
                callback();
                ON_POST_INPUT_COOR(_FV_SHOW_MSG.showWin, FV_RENDERED_SQS.board(
                        FMLAS.l(difficulty)), FV_TIMER.elapsedS());
            }, input, FV_RENDERED_SQS.row(FMLAS.l(difficulty), y),
                    FV_RENDERED_SQS.col(FMLAS.l(difficulty), x),
                    FV_RENDERED_SQS.grid(FMLAS.size(FMLAS.l(difficulty)), y,
                    x), x, y, FV_TIMER.elapsedS());
        });
        FV_RENDER_DOMS.setProp(P_VALID_CHARS, "innerHTML",
                "The list of valid characters are: " + FMLAS.chars(difficulty));
        FV_TIMER.restart();
    }, _FV_SHOW_MSG = FVShowMsg(
            () => ON_ALERT_OK(FV_TIMER.elapsedS()), ON_PROMPT_OK);
    return {
        showPlayDemoErr: _FV_SHOW_MSG.showPlayDemoErr,
        playDemo: (evs, difficulty, board, filledCoors) => {
            FV_VISIBILITY.beVisible(P_PLAYING_DEMO);
            _render(difficulty, board, filledCoors);
            FV_PLAY_DEMO(evs);
        }, promptFilledCoorNo: _FV_SHOW_MSG.promptFilledCoorNo,
        render: (difficulty, board, filledCoors) => {
            FV_VISIBILITY.beInvisible(P_PLAYING_DEMO);
            _render(difficulty, board, filledCoors);
        }
    };
}, FVRenderDoms = () => ({
    callFn: (dom, fn, args) => dom[fn].apply(dom, args),
    setProp: (dom, prop, val) => { if (dom[prop] !== val) dom[prop] = val; }
}), FVRenderedDoms = () => ({
    callFn: (dom, fn, args) => dom[fn].apply(dom, args),
    getProp: (dom, prop) => dom[prop]
}), FVShowMsg = (BTN_ALERT_CLOSE, BTN_PROMPT_CLOSE, DIV_ALERT, DIV_OVERLAY,
        DIV_PROMPT, INPUT_PROMPT, P_ALERT_MSG, P_PROMPT_MSG, FV_RENDER_DOMS,
        FV_RENDERED_DOMS, FV_VISIBILITY, ON_ALERT_OK, ON_PROMPT_OK) => {
    const _show = msg => {
        FV_VISIBILITY.beVisible(DIV_OVERLAY);
        FV_VISIBILITY.beVisible(DIV_ALERT);
        FV_RENDER_DOMS.setProp(P_ALERT_MSG, "innerHTML", msg);
    };
    FV_RENDER_DOMS.setProp(BTN_ALERT_CLOSE, "onclick", () => {
        FV_RENDER_DOMS.setProp(P_ALERT_MSG, "innerHTML", "");
        FV_VISIBILITY.beInvisible(DIV_ALERT);
        FV_VISIBILITY.beInvisible(DIV_OVERLAY);
        ON_ALERT_OK();
    });
    FV_RENDER_DOMS.setProp(BTN_PROMPT_CLOSE, "onclick", () => {
        const input = FV_RENDERED_DOMS.getProp(INPUT_PROMPT, "value");
        FV_RENDER_DOMS.setProp(INPUT_PROMPT, "value", "");
        FV_RENDER_DOMS.setProp(P_PROMPT_MSG, "innerHTML", "");
        FV_VISIBILITY.beInvisible(DIV_PROMPT);
        FV_VISIBILITY.beInvisible(DIV_OVERLAY);
        ON_PROMPT_OK(input);
    });
    return {
        showPlayDemoErr: msg => {
            _show("Failed to load the demo, please try again." +
                    "\nReasons of failure:\n" + msg);
        }, promptFilledCoorNo: (min, max) => {
            FV_VISIBILITY.beVisible(DIV_OVERLAY);
            FV_VISIBILITY.beVisible(DIV_PROMPT);
            FV_RENDER_DOMS.setProp(P_PROMPT_MSG, "innerHTML", "Please enter " +
                    "the number of filled coordinates that should be between" +
                    ` ${min} and ${max}:`);
        }, showInputViolations: inputViolations => {
            _show(inputViolations.join("\n"));
        }, showWin: () => _show("You've finished this board!")
    };
}, FVTimer = (INPUT_TIMER_VISIBILITY, P_TIMER_TXT, FV_RENDER_DOMS,
        FV_RENDERED_DOMS, FV_VISIBILITY) => {
    const elapsedS = () => FV_RENDERED_DOMS.getProp(P_TIMER_TXT, "innerHTML").
            replace("seconds", "");
    function * _restartGen() {
        while (true) {
            const timerId = setInterval(() => {
                FV_RENDER_DOMS.setProp(P_TIMER_TXT, "innerHTML",
                        ((+elapsedS() * 1000 + 10) / 1000.0).toFixed(2) +
                        "seconds");
                }, 10);
            yield;
            clearInterval(timerId);
        }
    };
    const _RESTART_GEN = _restartGen();
    INPUT_TIMER_VISIBILITY.onchange = () =>
            INPUT_TIMER_VISIBILITY.checked ? FV_VISIBILITY.beVisible(
            P_TIMER_TXT) : FV_VISIBILITY.beInvisible(P_TIMER_TXT);
    return {
        restart: () => {
            FV_RENDER_DOMS.setProp(P_TIMER_TXT, "innerHTML", "0seconds");
            _RESTART_GEN.next();
        }, elapsedS
     };
}, FVVisibility = () => {
    const _changeVisibility = (oldVisibility, newVisibility, dom) => {
        const classList = dom.classList;
        classList.remove(oldVisibility);
        classList.add(newVisibility);
    };
    return {
        beVisible: _changeVisibility.bind(this, "invisible", "visible"),
        beInvisible: _changeVisibility.bind(this, "visible", "invisible")
    };
}, FCGame = (FM_APIS, FVRenderBoard) => {
    const onPlayNewGame = difficulty => {
        const { min, max } = FM_APIS.filledCoorNoMinMax(difficulty);
        _ON_PROMPT_OK_GEN.next({ difficulty, min, max });
    };
    function * _onPromptOkGen() {
        while (true) {
            const { difficulty, min, max } = yield;
            let filledCoorNo = -1;
            while (filledCoorNo < min || filledCoorNo > max) {
                _FV_RENDER_BOARD.promptFilledCoorNo(min, max);
                filledCoorNo = +(yield);
            }
            const board = FM_APIS.newBoard(difficulty), filledCoors =
                    FM_APIS.newFilledCoors(difficulty, filledCoorNo);
            _FV_RENDER_BOARD.render(difficulty, board, filledCoors);
            FM_APIS.onStart(difficulty, board, filledCoors);
        }
    };
    const _ON_PROMPT_OK_GEN = _onPromptOkGen();
    _ON_PROMPT_OK_GEN.next();
    const _FV_RENDER_BOARD = FVRenderBoard(_ON_PROMPT_OK_GEN.next.bind(
            _ON_PROMPT_OK_GEN), (difficulty, callback, input, row, col, grid,
            x, y, elapsedS) => {
                FM_APIS.onRecInput(elapsedS, x, y, input);
                callback(FM_APIS.inputViolations(
                        difficulty, input, row, col, grid));
            }, FM_APIS.onAlertOk,
            (callback, board, elapsedS) => {
                if (!FM_APIS.isWon(board)) return;
                callback();
                FM_APIS.onWin(elapsedS);
            });
    return {
        onPlayRelaxedGame: onPlayNewGame.bind(this, "relaxed"),
        onPlayEasyGame: onPlayNewGame.bind(this, "easy"),
        onPlayNormalGame: onPlayNewGame.bind(this, "normal"),
        onPlayHardGame: onPlayNewGame.bind(this, "hard"),
        onPlayInsaneGame: onPlayNewGame.bind(this, "insane"),
        onPlayDemo: fileInput => {
            FM_APIS.importJSON(fileInput.files[0], contents => {
                const { evs, difficulty, board, filledCoors } = contents;
                FM_APIS.onMarkPlayDemo();
                _FV_RENDER_BOARD.playDemo(evs, difficulty, board, filledCoors);
            }, msg => _FV_RENDER_BOARD.showPlayDemoErr(msg));
        }
    };
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
Object.entries(DIFFICULTIES).forEach(([difficulty, cfg]) => {
    const chars = cfg.chars;
    if (!Number.isInteger(Math.sqrt(chars.length))) {
        console.warn("The length of the character list " +
                `${JSON.stringify(chars)} of the ${difficulty} difficulty ` +
                "isn't a square number!");
    }
    chars.forEach((char, i) => {
        chars.forEach((otherChar, j) => {
            if (char !== otherChar || i === j) return;
            console.warn(`The ${i} and ${j}th character of the character ` +
                    `list ${JSON.stringify(chars)} of the ${difficulty}` +
                    " difficulty are the same!");
        });
    });
    const l = chars.length, charValSpacings = cfg.charValSpacings;
    const gcd = (no1, no2) => no2 === 0 ? no1 : gcd(no2, no1 % no2);
    charValSpacings.forEach((charValSpacing, i) => {
        const complementIndex = charValSpacings.findIndex(complement => {
            return charValSpacing + complement === l;
        });
        if (complementIndex >= 0) {
            console.warn(`The sum of charValSpacing with indices ${i} and ` +
                    `${complementIndex} for difficulty ${difficulty} are ` +
                    `chars.length which is invalid!`);
        }
        const result = gcd(l, charValSpacing);
        if (result === 1) return;
        console.warn(`The gcd between chars.length, ${l}, and charValSpacing` +
                ` ${charValSpacing} for difficulty ${difficulty} should be 1` +
                ` but is instead ${result}!`);
    });
});
const EVS = {
    isStart: data => data.tag === "start", isWin: data => data.tag === "win",
    startData: (difficulty, board, filledCoors) => (
        { tag: "start", difficulty, board, filledCoors }),
    inputData: (x, y, char) => ({ tag: "input", x, y, char }),
    alertData: () => ({ tag: "alert" }), winData: () => ({ tag: "win" }),
    recEv: (evs, elapsedS, data) => evs[elapsedS] = evs[elapsedS] || data,
    playEv: (ev, domFn, setCharFn) => {
        if (!ev) return;
        if (ev.tag === "input") return setCharFn(domFn(ev.y, ev.x), ev.char);
        if (ev.tag === "alert") document.getElementById("alertClose").onclick();
    }, isSame: (ev1, ev2) => {
        if (Object.keys(ev1).length !== Object.keys(ev2).length) return false;
        return Object.entries(ev1).every(([tag, val]) => val === ev2[tag]);
    }
}, FMLAS = {
    chars: difficulty => DIFFICULTIES[difficulty].chars,
    l: difficulty => FMLAS.chars(difficulty).length, size: l => Math.sqrt(l),
    portionGroupIndex: (portionIndex, size) => Math.floor(portionIndex / size),
    portionIndexInGroup: (portionIndex, size) => portionIndex % size
}, INPUT_CHAR_VIOLATION = "This input's invalid in this difficulty!";
const INPUT_ROW_VIOLATION =
        "This input duplicates with another one in the same row!";
const INPUT_COL_VIOLATION =
        "This input duplicates with another one in the same column!";
const INPUT_GRID_VIOLATION =
        "This input duplicates with another one in the same grid!";
window.onload = CompositionRoot();
