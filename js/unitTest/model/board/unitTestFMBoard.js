/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMBaseBoard} FM_BOARD - The unit to bt tested against
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFMBoard = (FM_BOARD, SHOW_RESULT_MSGS) => {

    "use strict";

    // Only the 1st and last combinations are tests as there are too many
    const _EXPECTED_1ST_BOARDS = {
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
    const _EXPECTED_LAST_BOARDS = {
        relaxed: [
            ["2", "1", "0", "3"],
            ["0", "3", "2", "1"],
            ["1", "0", "3", "2"],
            ["3", "2", "1", "0"]
        ],
        easy: [
            ["7", "6", "5", "4", "3", "2", "1", "0", "8"],
            ["4", "3", "2", "1", "0", "8", "7", "6", "5"],
            ["1", "0", "8", "7", "6", "5", "4", "3", "2"],
            ["6", "5", "4", "3", "2", "1", "0", "8", "7"],
            ["3", "2", "1", "0", "8", "7", "6", "5", "4"],
            ["0", "8", "7", "6", "5", "4", "3", "2", "1"],
            ["5", "4", "3", "2", "1", "0", "8", "7", "6"],
            ["2", "1", "0", "8", "7", "6", "5", "4", "3"],
            ["8", "7", "6", "5", "4", "3", "2", "1", "0"]
        ],
        normal: [
            ["E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "F"],
            ["A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "F", "E", "D", "C", "B"],
            ["6", "5", "4", "3", "2", "1", "0", "F", "E", "D", "C", "B", "A", "9", "8", "7"],
            ["2", "1", "0", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3"],
            ["D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "F", "E"],
            ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "F", "E", "D", "C", "B", "A"],
            ["5", "4", "3", "2", "1", "0", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6"],
            ["1", "0", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2"],
            ["C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "F", "E", "D"],
            ["8", "7", "6", "5", "4", "3", "2", "1", "0", "F", "E", "D", "C", "B", "A", "9"],
            ["4", "3", "2", "1", "0", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5"],
            ["0", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
            ["B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "F", "E", "D", "C"],
            ["7", "6", "5", "4", "3", "2", "1", "0", "F", "E", "D", "C", "B", "A", "9", "8"],
            ["3", "2", "1", "0", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4"],
            ["F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"]
        ],
        hard: [
            ["N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O"],
            ["I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J"],
            ["D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E"],
            ["8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9"],
            ["3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4"],
            ["M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N"],
            ["H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I"],
            ["C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D"],
            ["7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8"],
            ["2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3"],
            ["L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M"],
            ["G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H"],
            ["B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C"],
            ["6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7"],
            ["1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2"],
            ["K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L"],
            ["F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G"],
            ["A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B"],
            ["5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6"],
            ["0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
            ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K"],
            ["E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F"],
            ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"],
            ["4", "3", "2", "1", "0", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5"],
            ["O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"]
        ],
        insane: [
            ["Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z"],
            ["S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T"],
            ["M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N"],
            ["G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H"],
            ["A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B"],
            ["4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5"],
            ["X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y"],
            ["R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S"],
            ["L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M"],
            ["F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G"],
            ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"],
            ["3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4"],
            ["W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X"],
            ["Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R"],
            ["K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L"],
            ["E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F"],
            ["8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9"],
            ["2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3"],
            ["V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W"],
            ["P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q"],
            ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K"],
            ["D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E"],
            ["7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8"],
            ["1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2"],
            ["U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V"],
            ["O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P"],
            ["I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J"],
            ["C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D"],
            ["6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7"],
            ["0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
            ["T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U"],
            ["N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O"],
            ["H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I"],
            ["B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C"],
            ["5", "4", "3", "2", "1", "0", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6"],
            ["Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"]
        ]
    };
    //

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFMBoard _unitTestAll");
        // These tests are duplicated to ensure that this function's indeed pure
        _unitTest("relaxed", [0, 1], _EXPECTED_1ST_BOARDS.relaxed);
        _unitTest("relaxed", [0, 1], _EXPECTED_1ST_BOARDS.relaxed);
        _unitTest("easy", [0, 1, 2], _EXPECTED_1ST_BOARDS.easy);
        _unitTest("easy", [0, 1, 2], _EXPECTED_1ST_BOARDS.easy);
        _unitTest("normal", [0, 1, 2, 3], _EXPECTED_1ST_BOARDS.normal);
        _unitTest("normal", [0, 1, 2, 3], _EXPECTED_1ST_BOARDS.normal);
        _unitTest("hard", [0, 1, 2, 3, 4], _EXPECTED_1ST_BOARDS.hard);
        _unitTest("hard", [0, 1, 2, 3, 4], _EXPECTED_1ST_BOARDS.hard);
        _unitTest("insane", [0, 1, 2, 3, 4, 5], _EXPECTED_1ST_BOARDS.insane);
        _unitTest("insane", [0, 1, 2, 3, 4, 5], _EXPECTED_1ST_BOARDS.insane);
        _unitTest("relaxed", [1, 0], _EXPECTED_LAST_BOARDS.relaxed);
        _unitTest("relaxed", [1, 0], _EXPECTED_LAST_BOARDS.relaxed);
        _unitTest("easy", [2, 1, 0], _EXPECTED_LAST_BOARDS.easy);
        _unitTest("easy", [2, 1, 0], _EXPECTED_LAST_BOARDS.easy);
        _unitTest("normal", [3, 2, 1, 0], _EXPECTED_LAST_BOARDS.normal);
        _unitTest("normal", [3, 2, 1, 0], _EXPECTED_LAST_BOARDS.normal);
        _unitTest("hard", [4, 3, 2, 1, 0], _EXPECTED_LAST_BOARDS.hard);
        _unitTest("hard", [4, 3, 2, 1, 0], _EXPECTED_LAST_BOARDS.hard);
        _unitTest("insane", [5, 4, 3, 2, 1, 0], _EXPECTED_LAST_BOARDS.insane);
        _unitTest("insane", [5, 4, 3, 2, 1, 0], _EXPECTED_LAST_BOARDS.insane);
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Number]} baseArgs - The building block of the argument list
     * @param {Array[Array[String]]} expectedBoard - The expected result
     */
    const _unitTest = (difficulty, baseArgs, expectedBoard) => {
        console.info("UnitTestFMBoard _unitTest");
        console.info(`difficulty: ${difficulty}`);
        console.info(`baseArgs: ${JSON.stringify(baseArgs)}`);
        console.info(`expectedBoard: ${expectedBoard}`);
        // Only the 1st and last combinations are tested as there are too many
        const board = FM_BOARD.bind(this, difficulty).apply(
                this, _boardArgs(baseArgs).concat([1]));
        console.info(`board: ${JSON.stringify(board)}`);
        SHOW_RESULT_MSGS(_failMsgs(difficulty, board, expectedBoard));
        //
    }; // _unitTest

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Number]} baseArgs - The building block of the argument list
     * @returns {Array[]} The requested list of arguments
     */
    const _boardArgs = baseArgs => {
        const portionInGroupArgs = Array(baseArgs.length).fill(baseArgs);
        return [
            baseArgs,
            baseArgs,
            portionInGroupArgs,
            portionInGroupArgs
        ];
    }; // _boardArgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The results to be tested against
     * @param {Array[Array[String]]} expectedBoard - The expected result
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

    console.info("UnitTestFMBoard pre");
    // These tests are duplicated to ensure that this function's nullipotent
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFMBoard post");

}; // UnitTestFMBoard
