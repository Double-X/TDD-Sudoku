/**
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Dom} INPUT_TIMER_VISIBILITY - The dom toggling the timer visibility
 * @param {Dom} P_TIMER_TXT - The text displaying the number of seconds elapsed
 * @param {FVRenderDoms} FV_RENDER_DOMS - The seam for actually rendering doms
 * @param {FVRenderedDoms} FV_RENDERED_DOMS - The seam for actually reading doms
 * @param {FVVisibility} FV_VISIBILITY - Sets the dom visibility
 * @returns {Object[Function]} The requested function mapping
 */
const FVTimer = (INPUT_TIMER_VISIBILITY, P_TIMER_TXT, FV_RENDER_DOMS,
        FV_RENDERED_DOMS, FV_VISIBILITY) => {

    "use strict";

    const _INTERVAL_MS = 10, _TXT_TIMER_UNIT = "seconds";

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     */
    const restart = () => {
        _setElapsedS(0);
        _RESTART_GEN.next();
    }; // restart

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @returns {String} The requested number of seconds elapsed
     */
    const elapsedS = () => {
        return FV_RENDERED_DOMS.getProp(P_TIMER_TXT, "innerHTML").replace(
                _TXT_TIMER_UNIT, "");
    }; // elapsedS

    function * _restartGen() {
        // Encapsulates the prompt input states at the cost of complex codes
        while (true) {
            // Stops the old timer right before starting the new one in restart
            const timerId = setInterval(_onUpdate, _INTERVAL_MS);
            yield;
            clearInterval(timerId);
            //
        }
        //
    }; // _restartGen

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _onUpdate = () => { _setElapsedS(_updatedElapsedMs()); };

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @returns {Number} The requested updated number of milliseconds elapsed
     */
    const _updatedElapsedMs = () => _elapsedMs() + _INTERVAL_MS;

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @returns {Number} The requested number of milliseconds elapsed
     */
    const _elapsedMs = () => +elapsedS() * 1000;

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     */
    const _setElapsedS = elapsedMs => {
        FV_RENDER_DOMS.setProp(
                P_TIMER_TXT, "innerHTML", _elapsedSTxt(elapsedMs));
    }; // _setElapsedS

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} elapsedMs - The number of milliseconds elapsed
     * @returns {String} The requested text showing the number of elapsed second
     */
    const _elapsedSTxt = elapsedMs => {
        return (elapsedMs / 1000.0).toFixed(2) + _TXT_TIMER_UNIT;
    }; // _elapsedSTxt

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _setOnchange = () => {
        INPUT_TIMER_VISIBILITY.onchange = _onVisibilityChange;
    }; // _setOnchange

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _onVisibilityChange = () => {
        if (INPUT_TIMER_VISIBILITY.checked) {
            return FV_VISIBILITY.beVisible(P_TIMER_TXT);
        }
        FV_VISIBILITY.beInvisible(P_TIMER_TXT);
    }; // _onVisibilityChange

    const _RESTART_GEN = _restartGen();

    _setOnchange();

    return { restart, elapsedS };

}; // FVTimer
