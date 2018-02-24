/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Function(String)} SHOW_FAIL_MSG_STACK_TRACE - Shows the test failure
 *                                                       message with stacktrace
 */
const UnitTestFMInputViolations = SHOW_FAIL_MSG_STACK_TRACE => {

    "use strict";

    const _FM_INPUT_VIOLATIONS = FMInputViolations();

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFMInputViolations _unitTestAll");
        // These tests are duplicated to ensure that this function's indeed pure
        _unitTestNoInput();
        _unitTestNoInput();
        _unitTestValidInput();
        _unitTestValidInput();
        _unitTestCharViolation();
        _unitTestCharViolation();
        _unitTestRowViolation();
        _unitTestRowViolation();
        _unitTestColViolation();
        _unitTestColViolation();
        _unitTestGridViolation();
        _unitTestGridViolation();
        _unitTestRowColViolation();
        _unitTestRowColViolation();
        _unitTestRowGridViolation();
        _unitTestRowGridViolation();
        _unitTestColGridViolation();
        _unitTestColGridViolation();
        _unitTestRowColGridViolation();
        _unitTestRowColGridViolation();
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestNoInput = () => {
        console.info("UnitTestFMInputViolations _unitTestNoInput");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "",
                ["2", "", "0", "1"], ["1", "", "2", "0"], ["0", "1", "2", ""]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        }
        if (violations.length <= 0) return console.info("Passed!");
        SHOW_FAIL_MSG_STACK_TRACE("violations should be empty but is instead" +
                ` ${shownViolations}!`);
    }; // _unitTestNoInput

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestValidInput = () => {
        console.info("UnitTestFMInputViolations _unitTestValidInput");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "3",
                ["2", "3", "0", "1"], ["1", "3", "2", "0"],
                ["0", "1", "2", "3"]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        }
        if (violations.length <= 0) return console.info("Passed!");
        SHOW_FAIL_MSG_STACK_TRACE("violations should be empty but is " +
                `instead ${shownViolations}!`);
    }; // _unitTestValidInput

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestCharViolation = () => {
        console.info("UnitTestFMInputViolations _unitTestCharViolation");
        // It's impossible for an invalid character to have any other violation
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "4",
                ["2", "4", "0", "1"], ["1", "4", "2", "0"],
                ["0", "1", "2", "4"]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!")
        }
        if (violations.length === 1 && violations[0] === INPUT_CHAR_VIOLATION) {
            return console.info("Passed!");
        }
        SHOW_FAIL_MSG_STACK_TRACE("violations should have " +
                `${INPUT_CHAR_VIOLATION} only but is instead ` +
                `${shownViolations}!`);
        //
    }; // _unitTestCharViolation

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestRowViolation = () => {
        console.info("UnitTestFMInputViolations _unitTestRowViolation");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "1",
                ["", "1", "", "1"], ["", "1", "2", ""], ["0", "", "", "1"]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        }
        if (violations.length === 1 && violations[0] === INPUT_ROW_VIOLATION) {
            return console.info("Passed!");
        }
        SHOW_FAIL_MSG_STACK_TRACE("violations should have " +
                `${INPUT_ROW_VIOLATION} only but is instead ` +
                `${shownViolations}!`);
    }; // _unitTestRowViolation

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestColViolation = () => {
        console.info("UnitTestFMInputViolations _unitTestColViolation");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "2",
                ["", "2", "", "1"], ["", "2", "2", ""], ["0", "", "", "2"]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        }
        if (violations.length === 1 && violations[0] === INPUT_COL_VIOLATION) {
            return console.info("Passed!");
        }
        SHOW_FAIL_MSG_STACK_TRACE("violations should have " +
                `${INPUT_COL_VIOLATION} only but is instead ` +
                `${shownViolations}!`);
    }; // _unitTestColViolation

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestGridViolation = () => {
        console.info("UnitTestFMInputViolations _unitTestGridViolation");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "0",
                ["", "0", "", "1"], ["", "0", "2", ""], ["0", "", "", "0"]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        }
        if (violations.length === 1 && violations[0] === INPUT_GRID_VIOLATION) {
            return console.info("Passed!");
        }
        SHOW_FAIL_MSG_STACK_TRACE("violations should have " +
                `${INPUT_GRID_VIOLATION} only but is instead ` +
                `${shownViolations}!`);
    }; // _unitTestGridViolation

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestRowColViolation = () => {
        console.info("UnitTestFMInputViolations _unitTestRowColViolation");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "3",
                ["3", "1", "2", "3"], ["3", "2", "1", "3"],
                ["3", "1", "2", ""]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        } else if (violations.length === 2 &&
                violations.includes(INPUT_ROW_VIOLATION) &&
                violations.includes(INPUT_COL_VIOLATION)) {
            return console.info("Passed!");
        }
        SHOW_FAIL_MSG_STACK_TRACE("violations should have " +
                `${INPUT_ROW_VIOLATION} and ${INPUT_COL_VIOLATION} only but ` +
                `is instead ${shownViolations}!`);
    }; // _unitTestRowColViolation

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestRowGridViolation = () => {
        console.info("UnitTestFMInputViolations _unitTestRowGridViolation");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "3",
                ["3", "1", "2", "3"], ["3", "2", "1", ""],
                ["3", "1", "2", "3"]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        } else if (violations.length === 2 &&
                violations.includes(INPUT_ROW_VIOLATION) &&
                violations.includes(INPUT_GRID_VIOLATION)) {
            return console.info("Passed!");
        }
        SHOW_FAIL_MSG_STACK_TRACE("violations should have " +
                `${INPUT_ROW_VIOLATION} and ${INPUT_GRID_VIOLATION} only but` +
                ` is instead ${shownViolations}!`);
    }; // _unitTestRowGridViolation

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestColGridViolation = () => {
        console.info("UnitTestFMInputViolations _unitTestColGridViolation");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "3",
                ["3", "1", "2", ""], ["3", "2", "1", "3"],
                ["3", "1", "2", "3"]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        } else if (violations.length === 2 &&
                violations.includes(INPUT_COL_VIOLATION) &&
                violations.includes(INPUT_GRID_VIOLATION)) {
            return console.info("Passed!");
        }
        SHOW_FAIL_MSG_STACK_TRACE("violations should have " +
                `${INPUT_COL_VIOLATION} and ${INPUT_GRID_VIOLATION} only but` +
                ` is instead ${shownViolations}!`);
    }; // _unitTestColGridViolation

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestRowColGridViolation = () => {
        console.info("UnitTestFMInputViolations _unitTestRowColGridViolation");
        const violations = _FM_INPUT_VIOLATIONS("relaxed", "3",
                ["3", "1", "2", "3"], ["3", "2", "1", "3"],
                ["3", "1", "2", "3"]);
        const shownViolations = JSON.stringify(violations);
        console.info(`violations: ${shownViolations}`);
        if (violations.constructor !== Array) {
            return SHOW_FAIL_MSG_STACK_TRACE("violations isn't an Array!");
        } else if (violations.length === 3 &&
                violations.includes(INPUT_ROW_VIOLATION) &&
                violations.includes(INPUT_COL_VIOLATION) &&
                violations.includes(INPUT_GRID_VIOLATION)) {
            return console.info("Passed!");
        }
        SHOW_FAIL_MSG_STACK_TRACE("violations should have " +
                `${INPUT_ROW_VIOLATION}, ${INPUT_COL_VIOLATION} and ` +
                `${INPUT_GRID_VIOLATION} only but is instead ` + 
                `${shownViolations}!`);
    }; // _unitTestRowColGridViolation

    console.info("UnitTestFMInputViolations pre");
    // These tests are duplicated to ensure that this function's indeed pure
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFMInputViolations post");

}; // UnitTestFMInputViolations
