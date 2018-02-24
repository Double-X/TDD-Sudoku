/**
 * Idempotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {FVRenderBoard} The requested view composition root
 */
const FVCompositionRoot = () => {

    "use strict";

    // Increases readability at the cost of having redunant variables
    const _BTN_ALERT_CLOSE = document.getElementById("alertClose");
    const _BTN_PROMPT_CLOSE = document.getElementById("promptClose");
    const _DIV_ALERT = document.getElementById("alert");
    const _DIV_BOARD = document.getElementById("board");
    const _DIV_OVERLAY = document.getElementById("overlay");
    const _DIV_PROMPT = document.getElementById("prompt");
    const _INPUT_PROMPT = document.getElementById("promptInput");
    const _INPUT_TIMER_VISIBILITY = document.getElementById("timerVisibility");
    const _P_ALERT_MSG = document.getElementById("alertMsg");
    const _P_PLAYING_DEMO = document.getElementById("playingDemo");
    const _P_PROMPT_MSG = document.getElementById("promptMsg");
    const _P_VALID_CHARS = document.getElementById("validChars");
    const _P_TIMER_TXT = document.getElementById("timerTxt");
    const _FV_RENDER_DOMS = FVRenderDoms();
    const _FV_RENDERED_DOMS = FVRenderedDoms(), _FV_RENDER_SQ_PARAMS =
            FVRenderSqParams(_FV_RENDER_DOMS, _FV_RENDERED_DOMS);
    const _FV_RENDERED_FIXED_SQ = FVRenderedFixedSq(_FV_RENDER_SQ_PARAMS);
    const _FV_RENDERED_SQ = FVRenderedSq(_FV_RENDER_SQ_PARAMS);
    const _FV_RENDERED_SQS = FVRenderedSqs(_FV_RENDER_SQ_PARAMS);
    const _FV_RENDER_SQS = FVRenderSqs(_DIV_BOARD, _FV_RENDER_DOMS,
            _FV_RENDERED_FIXED_SQ, _FV_RENDERED_SQ);
    const _FV_VISIBILITY = FVVisibility();
    const _FVShowMsg = FVShowMsg.bind(this, _BTN_ALERT_CLOSE,
            _BTN_PROMPT_CLOSE, _DIV_ALERT, _DIV_OVERLAY, _DIV_PROMPT,
            _INPUT_PROMPT, _P_ALERT_MSG, _P_PROMPT_MSG, _FV_RENDER_DOMS,
            _FV_RENDERED_DOMS, _FV_VISIBILITY);
    const _FV_TIMER = FVTimer(_INPUT_TIMER_VISIBILITY, _P_TIMER_TXT,
            _FV_RENDER_DOMS, _FV_RENDERED_DOMS, _FV_VISIBILITY);
    const _FV_PLAY_DEMO = FVPlayDemo(_FV_RENDER_SQ_PARAMS, _FV_TIMER);
    const _FVRenderBoard = FVRenderBoard.bind(this, _P_PLAYING_DEMO,
            _P_VALID_CHARS, _FV_RENDERED_SQS, _FV_RENDER_SQS, _FV_RENDER_DOMS,
            _FV_PLAY_DEMO, _FVShowMsg, _FV_TIMER, _FV_VISIBILITY);
    //

    return _FVRenderBoard;

}; // FVCompositionRoot