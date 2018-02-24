/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMBaseBoard} FM_BASE_BOARD - Returns the fixed board as the base
 * @returns {Function(String, Array[Number], Array[Number],
 *           Array[Array[Number]], Array[Array[Number]]) ->
 *           Array[Array[String]]} The requested function
 */
const FMBoard = FM_BASE_BOARD => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Number]} rowGroupCombination - The row group index list
     * @param {Array[Number]} colGroupCombination - The column group index list
     * @param {Array[Array[Number]]} rowInGroupCombinations - The list of row
     *        index list in the same group
     * @param {Array[Array[Number]]} colInGroupCombinations - The list of column
     *        index list in the same group
     * @param {Number} charValSpacing - The character value spacing
     * @returns {Array[Array[String]]} The requested raw 2D character data table
     */
    const board = (difficulty, rowGroupCombination, colGroupCombination,
            rowInGroupCombinations, colInGroupCombinations, charValSpacing) => {
        const board = FM_BASE_BOARD(difficulty, charValSpacing);
        const size = FMLAS.size(board.length);
        // Swaps the rows first followed by swapping the columns
        return _reversedAxis(_swappedPortions(_reversedAxis(_swappedPortions(
                board, size, rowGroupCombination, rowInGroupCombinations)),
                size, colGroupCombination, colInGroupCombinations));
        //
    }; // board

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} portions - The list of portions as the 2D
     *                                          board
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Number]} portionGroupCombination - The portion group index
     *                                                  list
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @returns {Array[Array[String]]} The requested raw 2D character data table
     */
    const _swappedPortions = (portions, size, portionGroupCombination,
            portionInGroupCombinations) => {
        // Swaps the portion groups first followed by swapping portions in group
        return portions.map(_boardWithPortionGroupsSwapped.bind(this, size,
                portionGroupCombination)).map(_boardWithPortionsSwappedInGroups.
                bind(this, size, portionInGroupCombinations));
        //
    }; // _swappedPortions

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Number]} portionGroupCombination - The portion group index
     *                                                  list
     * @param {} portion - The placeholder argument
     * @param {Number} portionIndex - The index of the portion to be swapped
     * @param {Array[Array[String]]} board - The 2D board to be swapped
     * @returns {Array[Array[String]]} The requested raw 2D character data table
     */
    const _boardWithPortionGroupsSwapped = (
            size, portionGroupCombination, portion, portionIndex, board) => {
        return board[
            _portionGroupSwapIndex(size, portionGroupCombination, portionIndex)
        ];
    }; // _boardWithPortionGroupsSwapped

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Number]} portionGroupCombination - The portion group index
     *                                                  list
     * @param {Number} portionIndex - The index of the portion to be swapped
     * @returns {Number} The requested index for swapping portion groups
     */
    const _portionGroupSwapIndex = (
            size, portionGroupCombination, portionIndex) => {
        return _portionGroupBaseIndex(size, portionGroupCombination,
                portionIndex) + FMLAS.portionIndexInGroup(portionIndex, size);
    }; // _portionGroupSwapIndex

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Number]} portionGroupCombination - The portion group index
     *                                                  list
     * @param {Number} portionIndex - The index of the portion to be swapped
     * @returns {Number} The requested base index for swapping portion groups
     */
    const _portionGroupBaseIndex = (
            size, portionGroupCombination, portionIndex) => {
        return portionGroupCombination.indexOf(FMLAS.portionGroupIndex(
                portionIndex, size)) * size;
    }; // _portionGroupBaseIndex

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @param {} portion - The placeholder argument
     * @param {Number} portionIndex - The index of the portion to be swapped
     * @param {Array[Array[String]]} board - The 2D board to be swapped
     * @returns {Array[Array[String]]} The requested raw 2D character data table
     */
    const _boardWithPortionsSwappedInGroups = (
            size, portionInGroupCombinations, portion, portionIndex, board) => {
        return board[
            _portionInGroupSwapIndex(
                    size, portionInGroupCombinations, portionIndex)
        ];
    }; // _boardWithPortionsSwappedInGroups

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @param {Number} portionIndex - The index of the portion to be swapped
     * @returns {Number} The requested index for swapping portions in the group
     */
    const _portionInGroupSwapIndex = (
            size, portionInGroupCombinations, portionIndex) => {
        return portionIndex + _portionInGroupSwapOffset(
                size, portionInGroupCombinations, portionIndex);
    }; // _portionInGroupSwapIndex

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @param {Number} portionIndex - The index of the portion to be swapped
     * @returns {Number} The requested offset for swapping portions in the group
     */
    const _portionInGroupSwapOffset = (
            size, portionInGroupCombinations, portionIndex) => {
        const portionInGroupIndex =
                FMLAS.portionIndexInGroup(portionIndex, size);
        return _portionInGroupCombination(size, portionInGroupCombinations,
                portionIndex)[portionInGroupIndex] - portionInGroupIndex;
    }; // _portionInGroupSwapOffset

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @param {Number} portionIndex - The coordinate portion to be swapped
     * @returns {Array[Number]} The requested portion group index list
     */
    const _portionInGroupCombination = (
            size, portionInGroupCombinations, portionIndex) => {
        return portionInGroupCombinations[
            FMLAS.portionGroupIndex(portionIndex, size)
        ];
    }; // _portionInGroupCombination

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The 2D board to be reversed
     * @returns {Array[Array[String]]} The requested board with reversed axis
     */
    const _reversedAxis = board => {
        // Makes use of the fact the 2D board's a square
        return Array(board.length).fill("").map(
                _reversedPrimaryAxis.bind(this, board));
        //
    }; // _reversedAxis

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The 2D board to be reversed
     * @param {} primaryAxis - The placeholder argument
     * @param {Number} primaryIndex - The index of the reversed primary axis
     * @param {Array} lengthList - The placeholder for using Array functions
     * @returns {Array[String]} The requested reversed primary axis
     */
    const _reversedPrimaryAxis =
            (board, primaryAxis, primaryIndex, lengthList) => {
        // Makes use of the fact the 2D board's a square
        return lengthList.map(
                _reversedSecondaryAxis.bind(this, board, primaryIndex));
        //
    }; // _reversedPrimaryAxis

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The 2D board to be reversed
     * @param {Number} primaryIndex - The index of the reversed primary axis
     * @param {} secondaryAxis - The placeholder argument
     * @param {Number} secondaryIndex - The index of the reversed secondary axis
     * @returns {String} The requested character within the reversed secondary
     *                   axis
     */
    const _reversedSecondaryAxis = (
            board, primaryIndex, secondaryAxis, secondaryIndex) => {
        // Makes use of the fact the 2D board's a square
        return board[secondaryIndex][primaryIndex];
        //
    }; // _reversedSecondaryAxis

    return board;

}; // FMBoard
