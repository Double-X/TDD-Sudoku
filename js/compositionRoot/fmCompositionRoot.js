/**
 * Idempotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {FMAPIs} The requested model composition root
 */
const FMCompositionRoot = () => {

    "use strict";

    // Increases readability at the cost of having redunant variables
    const _FM_BASE_BOARD = FMBaseBoard(), _FM_BOARD = FMBoard(_FM_BASE_BOARD);
    const _FM_BASE_FILLED_COORS = FMBaseFilledCoors();
    const _FM_FILLED_COORS = FMFilledCoors(_FM_BASE_FILLED_COORS);
    const _FM_FILLED_COOR_NO_MIX_MAX =  FMFilledCoorNoMinMax();
    const _FM_INPUT_VIOLATIONS = FMInputViolations(), _FM_IS_WON = FMIsWon();
    const _FM_JSON_IO = FMJSONIO();
    const _FM_PICKED_COMBINATION = FMPickedCombination();
    const _FM_NEW_DATA = FMNewData(_FM_PICKED_COMBINATION);
    const _FM_NEW_BOARD = FMNewBoard(_FM_BOARD, _FM_NEW_DATA);
    const _FM_NEW_FILLED_COORS =
            FMNewFilledCoors(_FM_FILLED_COORS, _FM_NEW_DATA);
    const _FM_REC_DEMO = FMRecDemo(_FM_JSON_IO);
    const _FM_APIS = FMAPIs(_FM_FILLED_COOR_NO_MIX_MAX, _FM_INPUT_VIOLATIONS,
            _FM_IS_WON, _FM_JSON_IO, _FM_NEW_BOARD, _FM_NEW_FILLED_COORS,
            _FM_REC_DEMO);
    //

    return _FM_APIS;

}; // FMCompositionRoot