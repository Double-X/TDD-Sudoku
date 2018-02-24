/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMFilledCoorNoMinMax} FM_FILLED_COOR_NO_MIN_MAX - Returns the range
 *        of the valid number of filled coordinates
 * @param {FMInputViolations} FM_INPUT_VIOLATIONS - Returns the list of rules
 *                                                  violated by the given input
 * @param {FMIsWon} FM_IS_WON - Returns whether the game's won
 * @param {FMJSONIO} FM_JSON_IO - Exports and imports json data files
 * @param {FMNewBoard} FM_NEW_BOARD - Returns a new 2D board raw data
 * @param {FMNewFilledCoors} FM_NEW_FILLED_COORS - Returns a new list of filled
 *                                                 coordinates
 * @param {FMRecDemo} FM_REC_DEMO - Records the gameplay events into demo files
 * @returns {Object[Function]} The requested function mapping
 */
const FMAPIs = (FM_FILLED_COOR_NO_MIN_MAX, FM_INPUT_VIOLATIONS, FM_IS_WON,
        FM_JSON_IO, FM_NEW_BOARD, FM_NEW_FILLED_COORS, FM_REC_DEMO) => {

    "use strict";

    return {
        filledCoorNoMinMax: FM_FILLED_COOR_NO_MIN_MAX,
        inputViolations: FM_INPUT_VIOLATIONS,
        isWon: FM_IS_WON,
        importJSON: FM_JSON_IO.importJSON,
        newBoard: FM_NEW_BOARD,
        newFilledCoors: FM_NEW_FILLED_COORS,
        ...FM_REC_DEMO
    };

}; // FMAPIs
