/**
 * Idempotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Dom} BTN_ALERT_CLOSE - The dom closing the shown alert popup
 * @param {Dom} BTN_PROMPT_CLOSE - The dom closing the shown prompt popup
 * @param {Dom} DIV_ALERT - The dom being shown as the alert popup
 * @param {Dom} DIV_OVERLAY - The dom being shown as the popup overlay
 * @param {Dom} DIV_PROMPT - The dom being shown as the prompt popup
 * @param {Dom} INPUT_PROMPT - The dom as the prompt input
 * @param {Dom} P_ALERT_MSG - The dom showing the alert messages
 * @param {Dom} P_PROMPT_MSG - The dom showing the prompt messages
 * @param {FVRenderDoms} FV_RENDER_DOMS - The seam for actually rendering doms
 * @param {FVRenderedDoms} FV_RENDERED_DOMS - The seam for actually reading doms
 * @param {FVVisibility} FV_VISIBILITY - Sets the dom visibility
 * @param {Function()} ON_ALERT_OK - Notifies that the alert's acknowledged
 * @param {Function(String)} ON_PROMPT_OK - Notifies that the prompt's inputted
 * @returns {Object[Function]} The requested function mapping
 */
const FVShowMsg = (BTN_ALERT_CLOSE, BTN_PROMPT_CLOSE, DIV_ALERT, DIV_OVERLAY,
        DIV_PROMPT, INPUT_PROMPT, P_ALERT_MSG, P_PROMPT_MSG, FV_RENDER_DOMS,
        FV_RENDERED_DOMS, FV_VISIBILITY, ON_ALERT_OK, ON_PROMPT_OK) => {

    "use strict";

    const _MSG_FILLED_COOR_NO_PRE = "Please enter the number of filled " +
            "coordinates that should be between ";
    const _MSG_FILLED_COOR_NO_MID = " and ", _MSG_FILLED_COOR_NO_POST = ":";
    const _MSG_INPUT_VIOLATION_SEPARATOR = "\n";
    const _MSG_PLAY_DEMO_ERR = "Failed to load the demo, please try again." +
            "\nReasons of failure:\n";
    const _MSG_WIN = "You've finished this board!";

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} msg - The message to be shown upon failing to play demo
     */
    const showPlayDemoErr = msg => { _show(_playDemoErrMsg(msg)); };

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Number} min - The minimum number of filled coordinates
     * @param {Number} max - The maximum number of filled coordinates
     */
    const promptFilledCoorNo = (min, max) => {
        _prompt(_filledCoorNoMsg(min, max));
    }; // promptFilledCoorNo

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Array[String]} inputViolations - The list of input violations
     */
    const showInputViolations = inputViolations => {
        _show(_inputViolationMsg(inputViolations));
    }; // showInputViolations

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     */
    const showWin = () => { _show(_MSG_WIN); };

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} msg - The message to be shown upon failing to play demo
     * @returns {String} The requested formatted error messages
     */
    const _playDemoErrMsg = msg => _MSG_PLAY_DEMO_ERR + msg;

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} min - The minimum number of filled coordinates
     * @param {Number} max - The maximum number of filled coordinates
     * @returns {String} The requested text prompting the number of filled coors
     */
    const _filledCoorNoMsg = (min, max) => {
        return _MSG_FILLED_COOR_NO_PRE + min + _MSG_FILLED_COOR_NO_MID + max +
                _MSG_FILLED_COOR_NO_POST;
    }; // _filledCoorNoMsg

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} inputViolations - The list of input violations
     * @returns {String} The requested formatted message
     */
    const _inputViolationMsg = inputViolations => {
        return inputViolations.join(_MSG_INPUT_VIOLATION_SEPARATOR);
    }; // _inputViolationMsg

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} msg - The messages describing the prompt
     */
    const _prompt = msg => {
        FV_VISIBILITY.beVisible(DIV_OVERLAY);
        _showPrompt(msg);
    }; // _prompt

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} msg - The messages describing the prompt
     */
    const _showPrompt = msg => {
        FV_VISIBILITY.beVisible(DIV_PROMPT);
        FV_RENDER_DOMS.setProp(P_PROMPT_MSG, "innerHTML", msg);
    }; // _showPrompt

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} msg - The messages to be shown
     */
    const _show = msg => {
        FV_VISIBILITY.beVisible(DIV_OVERLAY);
        _showAlert(msg);
    }; // _show

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} msg - The messages to be shown
     */
    const _showAlert = msg => {
        FV_VISIBILITY.beVisible(DIV_ALERT);
        FV_RENDER_DOMS.setProp(P_ALERT_MSG, "innerHTML", msg);
    }; // _showAlert

    const _setupListeners = () => {
        FV_RENDER_DOMS.setProp(BTN_ALERT_CLOSE, "onclick", _onAlertOk);
        FV_RENDER_DOMS.setProp(BTN_PROMPT_CLOSE, "onclick", _onPromptOk);
    }; // _setupListeners

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _onAlertOk = () => {
        _clearAlert();
        FV_VISIBILITY.beInvisible(DIV_OVERLAY);
        ON_ALERT_OK();
    }; // _onAlertOk

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _clearAlert = () => {
        FV_RENDER_DOMS.setProp(P_ALERT_MSG, "innerHTML", "");
        FV_VISIBILITY.beInvisible(DIV_ALERT);
    }; // _clearAlert

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _onPromptOk = () => {
        // Stores the input before it's being cleared by _clearPrompt
        const input = FV_RENDERED_DOMS.getProp(INPUT_PROMPT, "value");
        _clearPrompt();
        //
        FV_VISIBILITY.beInvisible(DIV_OVERLAY);
        ON_PROMPT_OK(input);
    }; // _onPromptOk

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _clearPrompt = () => {
        FV_RENDER_DOMS.setProp(INPUT_PROMPT, "value", "");
        FV_RENDER_DOMS.setProp(P_PROMPT_MSG, "innerHTML", "");
        FV_VISIBILITY.beInvisible(DIV_PROMPT);
    }; // _clearPrompt

    _setupListeners();

    return {
        showPlayDemoErr,
        promptFilledCoorNo,
        showInputViolations,
        showWin
    };

}; // FVShowMsg
