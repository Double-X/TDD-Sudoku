/**
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMJSONIO} FM_JSON_IO - Exports and imports json data files
 * @returns {Object[Function]} The requested function mapping
 */
const FMRecDemo = FM_JSON_IO => {

    "use strict";

    const _NAME_DIFFICULTY_TAG = "D", _NAME_FILLED_COOR_NO_TAG = "FCN";
    const _NAME_ELAPSED_S_TAG = "S", _NAME_TAG_SEPARATOR = "_";

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     */
    const onStart = (difficulty, board, filledCoors) => {
        _recEv(0, EVS.startData(difficulty, board, filledCoors));
    }; // onStart

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     */
    const onMarkPlayDemo = () => { onStart("", [], []); /* Use invalid arg */ };

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} elapsedS - The number of seconds elapsed
     * @param {Number} x - The input x coordinate
     * @param {Number} y - The input y coordinate
     * @param {String} char - The inputted character
     */
    const onRecInput = (elapsedS, x, y, char) => {
        _recEv(elapsedS, EVS.inputData(x, y, char));
    }; // onRecInput

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} elapsedS - The number of seconds elapsed
     */
    const onAlertOk = elapsedS => { _recEv(elapsedS, EVS.alertData()); };

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} elapsedS - The number of seconds elapsed
     */
    const onWin = elapsedS => { _recEv(elapsedS, EVS.winData()); };

    /**
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} elapsedS - The number of seconds elapsed
     * @param {Object} data - The data of the event to be recorded
     */
    const _recEv = (elapsedS, data) => {
        // The object's so easy, simple and small that no extraction's needed
        _REC_EV_GEN.next({ elapsedS, data });
        //
    }; // _recEv

    /**
     * @author DoubleX @since v1.0 @version v1.0
     */
    function * _recEvGen() {
        // Encapsulates the demo recording states at the cost of complex codes
        const evs = {}, saveDemoGen = _genObj(_saveDemoGen.bind(this, evs));
        while (true) {
            const { elapsedS, data } = yield; // It enforces consistent args
            // Duplicating onStart and onWin are idempotent but still unwanted
            if (EVS.isStart(data) || EVS.isWin(data)) {
                saveDemoGen.next({ elapsedS, data }); // Only save end results
            } else {
                EVS.recEv(evs, elapsedS, data); // It assumes all events' valid
            }
            //
        }
        //
    }; // _recEvGen

    /**
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object[Object]} evs - The mapping from elapsed time to event data
     */
    function * _saveDemoGen(evs) {
        // Encapsulates the demo recording states at the cost of complex codes
        let difficulty = "", board = [], filledCoors = [];
        while (true) {
            const { elapsedS, data } = yield; // It enforces consistent args
            // It assumes that only onStart and onWin can call _saveDemoGen
            if (EVS.isStart(data)) {
                // It assumes that onStart is always called before onWin
                _clear(evs); // Otherwise evs would have stale records
                difficulty = data.difficulty;
                board = data.board, filledCoors = data.filledCoors;
                //
            } else {
              // Duplicate onWin will lead to duplicate save which is idempotent
              _saveDemo(Object.assign({}, evs), difficulty, board, filledCoors,
                      elapsedS); // So UnitTestFMRecDemo won't have wrong evs
              //
            }
            //
        }
        //
    }; // _saveDemoGen

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object} obj - The object to be cleared
     */
    const _clear = obj => { Object.keys(obj).forEach(key => delete obj[key]); };

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object[Object]} evs - The mapping from elapsed time to event data
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @param {String} elapsedS - The number of seconds elapsed
     */
    const _saveDemo = (evs, difficulty, board, filledCoors, elapsedS) => {
        // A demo's invalid if it's saved before being started
        if (_isInvalid(difficulty, board, filledCoors)) return;
        //
        // The objhect's too easy, simple and small to be extracted
        FM_JSON_IO.exportJSON(_demoName(difficulty, filledCoors.length,
                elapsedS), { evs, difficulty, board, filledCoors });
        //
    }; // _saveDemo

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @returns {Boolean} The check result
     */
    const _isInvalid = (difficulty, board, filledCoors) => {
        // They just happen to have the same checking so they're not DRYed up
        return !DIFFICULTIES[difficulty] || board.length <= 0 ||
                filledCoors.length <= 0;
        //
    }; // _isInvalid

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} filledCoorNo - The number of filled coordinates
     * @param {String} elapsedS - The number of seconds elapsed
     * @returns {String} The requested demo file name
     */
    const _demoName = (difficulty, filledCoorNo, elapsedS) => {
        return [
            _NAME_DIFFICULTY_TAG,
            difficulty,
            _NAME_FILLED_COOR_NO_TAG,
            filledCoorNo,
            _NAME_ELAPSED_S_TAG,
            elapsedS
        ].join(_NAME_TAG_SEPARATOR);
    }; // _demoName

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

    const _REC_EV_GEN = _genObj(_recEvGen); // Encapsulates demo recording state

    return { onStart, onMarkPlayDemo, onRecInput, onAlertOk, onWin };

}; // FMRecDemo
