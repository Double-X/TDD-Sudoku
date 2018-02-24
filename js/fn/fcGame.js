/**
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMAPIs} FM_APIS - Returns the model API mapping
 * @param {FVRenderBoard} FVRenderBoard - Renders the game 2D board
 */
const FCGame = (FM_APIS, FVRenderBoard) => {

    "use strict";

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     */
    const onPlayNewGame = difficulty => {
        const { min, max } = FM_APIS.filledCoorNoMinMax(difficulty);
        // The object' too easy, simple and small to be extracted in a function
        _ON_PROMPT_OK_GEN.next({ difficulty, min, max });
        //
    }; // onPlayNewGame

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Dom} fileInput - The dom as the raw file input
     */
    const onPlayDemo = fileInput => {
        // Only 1 recorded demo file can be played at a time
        FM_APIS.importJSON(fileInput.files[0], _onPlayDemoSuc, _onPlayDemoErr);
        //
    }; // onPlayDemo

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Function(Array[String])} callback - The callback notifying the
     *                                             list of input violations
     * @param {String} input - The character as the user input
     * @param {Array[String]} row - The row of the user input coordinates
     * @param {Array[String]} col - The column of the user input coordinates
     * @param {Array[String]} grid - The grid of the user input coordinates
     * @param {Number} x - The x coordinate of the given input
     * @param {Number} y - The y coordinate of the given input
     * @param {String} elapsedS - The number of seconds elapsed
     */
    const onPreInputCoor = (
            difficulty, callback, input, row, col, grid, x, y, elapsedS) => {
        FM_APIS.onRecInput(elapsedS, x, y, input);
        callback(FM_APIS.inputViolations(difficulty, input, row, col, grid));
    }; // onPreInputCoor

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Function()} callback - The callback notifying the the game's won
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {String} elapsedS - The number of seconds elapsed
     */
    const onPostInputCoor = (callback, board, elapsedS) => {
        if (!FM_APIS.isWon(board)) return;
        callback();
        FM_APIS.onWin(elapsedS);
    }; // onPostInputCoor

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object} contents - The contents of the JSON to be written
     */
    const _onPlayDemoSuc = contents => {
        const { evs, difficulty, board, filledCoors } = contents;
        FM_APIS.onMarkPlayDemo();
        _FV_RENDER_BOARD.playDemo(evs, difficulty, board, filledCoors);
    }; // _onPlayDemoSuc

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} msg - The message to be shown upon failing to play demo
     */
    const _onPlayDemoErr = msg => { _FV_RENDER_BOARD.showPlayDemoErr(msg); };

    /**
     * @author DoubleX @since v1.0 @version v1.0
     */
    function * _onPromptOkGen() {
        // Encapsulates the prompt input states at the cost of complex codes
        while (true) {
            const { difficulty, min, max } = yield; // Called upon starting game
            let filledCoorNo = -1; // It's impossible to be valid
            // The conditional's so obvious, stable and trivial that it's inline
            while (filledCoorNo < min || filledCoorNo > max) {
                _FV_RENDER_BOARD.promptFilledCoorNo(min, max);
                filledCoorNo = +(yield); // Called upon receiving prompt inputs
            }
            //
            _onPlayNewGameOk(difficulty, filledCoorNo); // The prompt's modal
        }
        //
    }; // _onPromptOkGen

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} filledCoorNo - The number of coordinates to be filled
     */
    const _onPlayNewGameOk = (difficulty, filledCoorNo) => {
        const board = FM_APIS.newBoard(difficulty), filledCoors =
                FM_APIS.newFilledCoors(difficulty, filledCoorNo);
        _FV_RENDER_BOARD.render(difficulty, board, filledCoors);
        FM_APIS.onStart(difficulty, board, filledCoors);
    }; // _onPlayNewGameOk

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Function *} genFn - The generator Function
     * @returns {Generator} The requested generator object
     */
    const _genObj = genFn => {
        const genObj = genFn();
        genObj.next();
        return genObj;
    }; // _genObj

    const _ON_PROMPT_OK_GEN = _genObj(_onPromptOkGen);
    const _FV_RENDER_BOARD = FVRenderBoard(_ON_PROMPT_OK_GEN.next.bind(
            _ON_PROMPT_OK_GEN), onPreInputCoor, FM_APIS.onAlertOk,
            onPostInputCoor);

    return {
        onPlayRelaxedGame: onPlayNewGame.bind(this, "relaxed"),
        onPlayEasyGame: onPlayNewGame.bind(this, "easy"),
        onPlayNormalGame: onPlayNewGame.bind(this, "normal"),
        onPlayHardGame: onPlayNewGame.bind(this, "hard"),
        onPlayInsaneGame: onPlayNewGame.bind(this, "insane"),
        onPlayDemo
    };

}; // FCGame
