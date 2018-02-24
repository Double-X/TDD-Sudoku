/**
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FVRenderSqParams} FV_RENDER_SQ_PARAMS - The seam for accessing
 *                                                 square display contents
 * @param {FVTimer} FV_TIMER - Shows the number of elapsed seconds in the game
 * @returns {Function()} The requested function
 */
const FVPlayDemo = (FV_RENDER_SQ_PARAMS, FV_TIMER) => {

    "use strict";

    const _INTERVAL_MS = 10;

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Object[Object]} evs - The mapping from elapsed time to event data
     */
    const start = evs => {
        _START_GEN.next(evs);
        _START_GEN.next(evs);
    }; // start

    function * _startGen() {
        // Encapsulates the prompt input states at the cost of complex codes
        while (true) {
            // Stops the old player right before starting the new one in start
            const evs = yield;
            const playerId =
                    setInterval(_onUpdate.bind(this, evs), _INTERVAL_MS);
            yield;
            clearInterval(playerId);
            //
        }
        //
    }; // _startGen

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object[Object]} evs - The mapping from elapsed time to event data
     */
    const _onUpdate = evs => {
        EVS.playEv(
                _ev(evs), FV_RENDER_SQ_PARAMS.dom, FV_RENDER_SQ_PARAMS.setChar);
    }; // _onUpdate

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object[Object]} evs - The mapping from elapsed time to event data
     * @returns {Object/Nullable} The requested recorded event
     */
    const _ev = evs => evs[FV_TIMER.elapsedS()];

    const _START_GEN = _startGen();

    return start;

}; // FVPlayDemo
