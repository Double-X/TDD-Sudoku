/**
 * Idempotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Function()} The requested app entry point
 */
const CompositionRoot = () => {

    "use strict";

    // Increases readability at the cost of having redunant variables
    const _BTN_RELAXED_GAME = document.getElementById("relaxed");
    const _BTN_EASY_GAME = document.getElementById("easy");
    const _BTN_NORMAL_GAME = document.getElementById("normal");
    const _BTN_HARD_GAME = document.getElementById("hard");
    const _BTN_INSANE_GAME = document.getElementById("insane");
    const _INPUT_PLAY_DEMO = document.getElementById("playDemo");
    const _FM_APIS = FMCompositionRoot(), _FVRenderBoard = FVCompositionRoot();
    const _FC_GAME = FCGame(_FM_APIS, _FVRenderBoard);
    //

    _BTN_RELAXED_GAME.onclick = _FC_GAME.onPlayRelaxedGame;
    _BTN_EASY_GAME.onclick = _FC_GAME.onPlayEasyGame;
    _BTN_NORMAL_GAME.onclick = _FC_GAME.onPlayNormalGame;
    _BTN_HARD_GAME.onclick = _FC_GAME.onPlayHardGame;
    _BTN_INSANE_GAME.onclick = _FC_GAME.onPlayInsaneGame;
    _INPUT_PLAY_DEMO.onchange =
            _FC_GAME.onPlayDemo.bind(this, _INPUT_PLAY_DEMO);

    return _FC_GAME.onPlayEasyGame;

}; // CompositionRoot
