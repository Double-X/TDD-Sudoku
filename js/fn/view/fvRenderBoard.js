/**
 * Idempotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Dom} P_PLAYING_DEMO - The dom showing that the demo file's playing
 * @param {Dom} P_VALID_CHARS - The dom showing the list of valid characters
 * @param {FVRenderedSqs} FV_RENDERED_SQS - Returns the rendered square data
 * @param {FVRenderSqs} FV_RENDER_SQS - Renders the squares in the board
 * @param {FVRenderDoms} FV_RENDER_DOMS - The seam for actually rendering doms
 * @param {FVPlayDemo} FV_PLAY_DEMO - Plays the recorded demo files
 * @param {FVShowMsg} FVShowMsg - Shows the given messages
 * @param {FVTimer} FV_TIMER - Shows the number of elapsed seconds in the game
 * @param {FVVisibility} FV_VISIBILITY - Sets the dom visibility
 * @param {Function(String, String)} ON_PROMPT_OK - Notifies that the prompt's
 *                                                  inputted
 * @param {Function(String, String, Array[String], Array[String],
 *         Array[String], Function(String))} ON_PRE_INPUT_COOR - The callback to
 *        be called right before accepting an input
 * @param {Function(String)} ON_ALERT_OK - Notifies that the alert's accepted
 * @param {Function(Array[Array[String]], Function())} ON_POST_INPUT_COOR -
 *        The callback to be called right after accepting an input
 * @returns {Object[Function]} The requested function mapping
 */
const FVRenderBoard = (P_PLAYING_DEMO, P_VALID_CHARS, FV_RENDERED_SQS,
        FV_RENDER_SQS, FV_RENDER_DOMS, FV_PLAY_DEMO, FVShowMsg, FV_TIMER,
        FV_VISIBILITY, ON_PROMPT_OK, ON_PRE_INPUT_COOR, ON_ALERT_OK,
        ON_POST_INPUT_COOR) => {

    "use strict";

    const _TXT_VALID_CHARS_PRE = "The list of valid characters are: ";

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     */
    const render = (difficulty, board, filledCoors) => {
        FV_VISIBILITY.beInvisible(P_PLAYING_DEMO);
        _render(difficulty, board, filledCoors);
    }; // render

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Object[Object]} evs - The mapping from elapsed time to event data
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     */
    const playDemo = (evs, difficulty, board, filledCoors) => {
        FV_VISIBILITY.beVisible(P_PLAYING_DEMO);
        _render(difficulty, board, filledCoors);
        FV_PLAY_DEMO(evs);
    }; // playDemo

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     */
    const _render = (difficulty, board, filledCoors) => {
        FV_RENDER_SQS(board, filledCoors,
                _onPreInputCoor.bind(this, difficulty, FMLAS.l(difficulty)));
        _showValidChars(FMLAS.chars(difficulty));
        FV_TIMER.restart();
    }; // _render

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} validChars - The list of valid characters
     */
    const _showValidChars = validChars => {
        // It's too easy, simple and small to be extracted into a module
        FV_RENDER_DOMS.setProp(
                P_VALID_CHARS, "innerHTML", _validCharTxt(validChars));
        //
    }; // _showValidChars

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} validChars - The list of valid characters
     * @returns {String} The requested description text
     */
    const _validCharTxt = validChars => _TXT_VALID_CHARS_PRE + validChars;

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} l - The length of the board
     * @param {String} input - The raw user input on the given square
     * @param {Number} x - The x coordinate of the given square
     * @param {Number} y - The y coordinate of the given square
     * @param {Function} callback - The callback notifying the input acceptances
     * @param {Function} errback - The callback notifying the input violations
     */
    const _onPreInputCoor = (difficulty, l, input, x, y, callback, errback) => {
        // Makes use of the fact the board's square
        ON_PRE_INPUT_COOR(difficulty, _onShowInputViolations.bind(this, l,
                callback, errback), input, FV_RENDERED_SQS.row(l, y),
                FV_RENDERED_SQS.col(l, x), FV_RENDERED_SQS.grid(FMLAS.size(l),
                y, x), x, y, FV_TIMER.elapsedS());
        //
    }; // _onPreInputCoor

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The length of the board
     * @param {Function} callback - The callback notifying the input acceptances
     * @param {Function} errback - The callback notifying the input violations
     * @param {Array[String]} inputViolations - The list of input violations
     */
    const _onShowInputViolations = (l, callback, errback, inputViolations) => {
        // Increases readability at the cost of the trivial _hasInputViolations
        if (_hasInputViolations(inputViolations)) {
            return _onInputViolations(errback, inputViolations);
        }
        //
        _onPostInputCoor(l, callback);
    }; // _onShowInputViolations

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} inputViolations - The list of input violations
     * @returns {Boolean} The check result
     */
    const _hasInputViolations = inputViolations => inputViolations.length > 0;

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Function} errback - The callback notifying the input violations
     * @param {Array[String]} inputViolations - The list of input violations
     */
    const _onInputViolations = (errback, inputViolations) => {
        errback();
        _FV_SHOW_MSG.showInputViolations(inputViolations);
    }; // _onInputViolations

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _onAlertOk = () => { ON_ALERT_OK(FV_TIMER.elapsedS()); };

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The length of the board
     * @param {Function} callback - The callback notifying the input acceptances
     */
    const _onPostInputCoor = (l, callback) => {
        // This ordering must be preserved or the passed board would be outdated
        callback();
        ON_POST_INPUT_COOR(_FV_SHOW_MSG.showWin, FV_RENDERED_SQS.board(l),
                FV_TIMER.elapsedS());
        //
    }; // _onPostInputCoor

    const _FV_SHOW_MSG = FVShowMsg(_onAlertOk, ON_PROMPT_OK);

    return {
        showPlayDemoErr: _FV_SHOW_MSG.showPlayDemoErr,
        playDemo,
        promptFilledCoorNo: _FV_SHOW_MSG.promptFilledCoorNo,
        render
    };

}; // FVRenderBoard
