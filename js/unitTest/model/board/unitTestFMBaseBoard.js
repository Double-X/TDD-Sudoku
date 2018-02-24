/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMBaseBoard} FM_BASE_BOARD - Returns the fixed board as the base
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFMBaseBoard = (FM_BASE_BOARD, SHOW_RESULT_MSGS) => {

    "use strict";

    const _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING = {
        relaxed: [
            ["0", "1", "2", "3"],
            ["2", "3", "0", "1"],
            ["1", "2", "3", "0"],
            ["3", "0", "1", "2"]
        ],
        easy: [
            ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
            ["3", "4", "5", "6", "7", "8", "0", "1", "2"],
            ["6", "7", "8", "0", "1", "2", "3", "4", "5"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "0"],
            ["4", "5", "6", "7", "8", "0", "1", "2", "3"],
            ["7", "8", "0", "1", "2", "3", "4", "5", "6"],
            ["2", "3", "4", "5", "6", "7", "8", "0", "1"],
            ["5", "6", "7", "8", "0", "1", "2", "3", "4"],
            ["8", "0", "1", "2", "3", "4", "5", "6", "7"]
        ],
        normal: [
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
            ["4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "0", "1", "2", "3"],
            ["8", "9", "A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7"],
            ["C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "0"],
            ["5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4"],
            ["9", "A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8"],
            ["D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C"],
            ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "0", "1"],
            ["6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5"],
            ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            ["E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"],
            ["3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "0", "1", "2"],
            ["7", "8", "9", "A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6"],
            ["B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A"],
            ["F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E"]
        ],
        hard: [
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
            ["5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4"],
            ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            ["F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E"],
            ["K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0"],
            ["6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5"],
            ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A"],
            ["G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
            ["L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
            ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1"],
            ["7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6"],
            ["C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B"],
            ["H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G"],
            ["M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
            ["3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2"],
            ["8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7"],
            ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C"],
            ["I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H"],
            ["N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
            ["4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3"],
            ["9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8"],
            ["E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"],
            ["J", "K", "L", "M", "N", "O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I"],
            ["O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"]
        ],
        insane: [
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            ["6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5"],
            ["C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B"],
            ["I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H"],
            ["O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"],
            ["U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0"],
            ["7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6"],
            ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C"],
            ["J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I"],
            ["P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
            ["V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"],
            ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1"],
            ["8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7"],
            ["E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"],
            ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
            ["Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"],
            ["W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V"],
            ["3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2"],
            ["9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8"],
            ["F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E"],
            ["L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
            ["R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"],
            ["X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W"],
            ["4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3"],
            ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            ["G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
            ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
            ["S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R"],
            ["Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"],
            ["5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4"],
            ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A"],
            ["H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G"],
            ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
            ["T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
            ["Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y"]
        ]
    };

    const _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING = {
        easy: [
            ["0", "4", "8", "3", "7", "2", "6", "1", "5"],
            ["3", "7", "2", "6", "1", "5", "0", "4", "8"],
            ["6", "1", "5", "0", "4", "8", "3", "7", "2"],
            ["4", "8", "3", "7", "2", "6", "1", "5", "0"],
            ["7", "2", "6", "1", "5", "0", "4", "8", "3"],
            ["1", "5", "0", "4", "8", "3", "7", "2", "6"],
            ["8", "3", "7", "2", "6", "1", "5", "0", "4"],
            ["2", "6", "1", "5", "0", "4", "8", "3", "7"],
            ["5", "0", "4", "8", "3", "7", "2", "6", "1"],
        ],
        normal: [
            ["0", "7", "E", "5", "C", "3", "A", "1", "8", "F", "6", "D", "4", "B", "2", "9"],
            ["C", "3", "A", "1", "8", "F", "6", "D", "4", "B", "2", "9", "0", "7", "E", "5"],
            ["8", "F", "6", "D", "4", "B", "2", "9", "0", "7", "E", "5", "C", "3", "A", "1"],
            ["4", "B", "2", "9", "0", "7", "E", "5", "C", "3", "A", "1", "8", "F", "6", "D"],
            ["7", "E", "5", "C", "3", "A", "1", "8", "F", "6", "D", "4", "B", "2", "9", "0"],
            ["3", "A", "1", "8", "F", "6", "D", "4", "B", "2", "9", "0", "7", "E", "5", "C"],
            ["F", "6", "D", "4", "B", "2", "9", "0", "7", "E", "5", "C", "3", "A", "1", "8"],
            ["B", "2", "9", "0", "7", "E", "5", "C", "3", "A", "1", "8", "F", "6", "D", "4"],
            ["E", "5", "C", "3", "A", "1", "8", "F", "6", "D", "4", "B", "2", "9", "0", "7"],
            ["A", "1", "8", "F", "6", "D", "4", "B", "2", "9", "0", "7", "E", "5", "C", "3"],
            ["6", "D", "4", "B", "2", "9", "0", "7", "E", "5", "C", "3", "A", "1", "8", "F"],
            ["2", "9", "0", "7", "E", "5", "C", "3", "A", "1", "8", "F", "6", "D", "4", "B"],
            ["5", "C", "3", "A", "1", "8", "F", "6", "D", "4", "B", "2", "9", "0", "7", "E"],
            ["1", "8", "F", "6", "D", "4", "B", "2", "9", "0", "7", "E", "5", "C", "3", "A"],
            ["D", "4", "B", "2", "9", "0", "7", "E", "5", "C", "3", "A", "1", "8", "F", "6"],
            ["9", "0", "7", "E", "5", "C", "3", "A", "1", "8", "F", "6", "D", "4", "B", "2"]
        ],
        hard: [
            ["0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D"],
            ["A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N"],
            ["K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8"],
            ["5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I"],
            ["F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3"],
            ["C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0"],
            ["M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A"],
            ["7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K"],
            ["H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5"],
            ["2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F"],
            ["O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C"],
            ["9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M"],
            ["J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7"],
            ["4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H"],
            ["E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2"],
            ["B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O"],
            ["L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9"],
            ["6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J"],
            ["G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4"],
            ["1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E"],
            ["N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B"],
            ["8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L"],
            ["I", "5", "H", "4", "G", "3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6"],
            ["3", "F", "2", "E", "1", "D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G"],
            ["D", "0", "C", "O", "B", "N", "A", "M", "9", "L", "8", "K", "7", "J", "6", "I", "5", "H", "4", "G", "3", "F", "2", "E", "1"]
        ],
        insane: [
            ["0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J"],
            ["U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D"],
            ["O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7"],
            ["I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1"],
            ["C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V"],
            ["6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P"],
            ["H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0"],
            ["B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U"],
            ["5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O"],
            ["Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I"],
            ["T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C"],
            ["N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6"],
            ["Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H"],
            ["S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B"],
            ["M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5"],
            ["G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z"],
            ["A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T"],
            ["4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N"],
            ["F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y"],
            ["9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S"],
            ["3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M"],
            ["X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G"],
            ["R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A"],
            ["L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4"],
            ["W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F"],
            ["Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9"],
            ["K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3"],
            ["E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X"],
            ["8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R"],
            ["2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L"],
            ["D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W"],
            ["7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q"],
            ["1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K"],
            ["V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E"],
            ["P", "6", "N", "4", "L", "2", "J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8"],
            ["J", "0", "H", "Y", "F", "W", "D", "U", "B", "S", "9", "Q", "7", "O", "5", "M", "3", "K", "1", "I", "Z", "G", "X", "E", "V", "C", "T", "A", "R", "8", "P", "6", "N", "4", "L", "2"]
        ]
    };

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFMBaseBoard _unitTestAll");
        // These tests are duplicated to ensure that this function's indeed pure
        _unitTest("relaxed", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.relaxed);
        _unitTest("relaxed", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.relaxed);
        _unitTest("easy", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.easy);
        _unitTest("easy", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.easy);
        _unitTest("normal", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.normal);
        _unitTest("normal", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.normal);
        _unitTest("hard", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.hard);
        _unitTest("hard", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.hard);
        _unitTest("insane", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.insane);
        _unitTest("insane", 1, _EXPECTED_BOARDS_MIN_CHAR_VAL_SPACING.insane);
        _unitTest("easy", 4, _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING.easy);
        _unitTest("easy", 4, _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING.easy);
        _unitTest("normal", 7, _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING.normal);
        _unitTest("normal", 7, _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING.normal);
        _unitTest("hard", 12, _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING.hard);
        _unitTest("hard", 12, _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING.hard);
        _unitTest("insane", 17, _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING.insane);
        _unitTest("insane", 17, _EXPECTED_BOARDS_MAX_CHAR_VAL_SPACING.insane);
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} charValSpacing - The character value spacing
     * @param {Array[Array[String]]} expectedBoard - The expected results
     */
    const _unitTest = (difficulty, charValSpacing, expectedBoard) => {
        console.info("UnitTestFMBaseBoard _unitTest");
        console.info(`difficulty: ${difficulty}`);
        console.info(`charValSpacing: ${charValSpacing}`);
        console.info(`expectedBoard: ${JSON.stringify(expectedBoard)}`);
        const board = FM_BASE_BOARD(difficulty, charValSpacing);
        console.info(`board: ${JSON.stringify(board)}`);
        SHOW_RESULT_MSGS(_failMsgs(difficulty, board, expectedBoard));
    }; // _unitTest

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The results to be tested against
     * @param {Array[Array[String]]} expectedBoard - The expected results
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failMsgs = (difficulty, board, expectedBoard) => {
        if (!board) return ["board doesn't exist!"];
        if (board.constructor !== Array) return ["board isn't an Array!"];
        const failMsgs = [];
        const expectedLength = FMLAS.l(difficulty), rowNo = board.length;
        if (rowNo !== expectedLength) {
            failMsgs.push(`the board height should be ${expectedLength} but ` +
                    `is instead ${rowNo}!`);
        }
        return board.reduce(_failRowMsgs.bind(
                this, expectedLength, expectedBoard), failMsgs);
    }; // _failMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} expectedLength - The length of the expected results
     * @param {Array[Array[String]]} expectedBoard - The expected results
     * @param {Array[String]} accumFailRowMsgs - The accumulated list of failure
     * @param {Array[String]} row - The row to be tested against
     * @param {Number} rowIndex - The index of the row to be tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failRowMsgs = (
            expectedLength, expectedBoard, accumFailRowMsgs, row, rowIndex) => {
        if (row.constructor !== Array) {
            return accumFailRowMsgs.concat(
                    [`the ${rowIndex}th row isn't an Array!`]);
        }
        const rowLength = row.length, failRowMsgs = [];
        if (rowLength !== expectedLength) {
            failRowMsgs.push(`the ${rowIndex}th row should have ` +
                    `${expectedLength} characters but has intead ` +
                    `${rowLength}!`);
        }
        return accumFailRowMsgs.concat(failRowMsgs).concat(
                _failCharMsgs(expectedBoard, row, rowIndex));
    }; // _failRowMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} expectedBoard - The expected results
     * @param {Array[String]} row - The row to be tested against
     * @param {Number} rowIndex - The index of the row to be tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failCharMsgs = (expectedBoard, row, rowIndex) => {
        return row.reduce(
                _accumFailCharMsgs.bind(this, expectedBoard, rowIndex), []);
    }; // _failCharMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} expectedBoard - The expected results
     * @param {Number} rowIndex - The index of the row to be tested against
     * @param {Array[String]} accumFailCharMsgs - The list of fail messages
     * @param {String} char - The character to be tested against
     * @param {Number} colIndex - The index of the column to be tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumFailCharMsgs = (
            expectedBoard, rowIndex, accumFailCharMsgs, char, colIndex) => {
        const expectedChar = expectedBoard[rowIndex][colIndex];
        if (char === expectedChar) return accumFailCharMsgs;
        return accumFailCharMsgs.concat(["the character with row index " +
                `${rowIndex} and column index ${colIndex} should be ` +
                `${expectedChar} but is instead ${char}!`]);
    }; // _accumFailCharMsgs

    console.info("UnitTestFMBaseBoard pre");
    // These tests are duplicated to ensure that this function's indeed pure
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFMBaseBoard post");

}; // UnitTestFMBaseBoard
