/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMBaseFilledCoors} FM_BASE_FILLED_COORS - Returns the fixed list of
 *        filled coordinates as the base
 * @returns {Function(String, Number, Array[Number], Array[Number],
 *           Array[Array[Number]], Array[Array[Number]]) ->
 *           {Array[Object[Number, Number]]}} The requested function
 */
const FMFilledCoors = FM_BASE_FILLED_COORS => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} filledCoorNo - The number of coordinates to be filled
     * @param {Array[Number]} rowGroupCombination - The row group index list
     * @param {Array[Number]} colGroupCombination - The column group index list
     * @param {Array[Array[Number]]} rowInGroupCombinations - The list of row
     *        index list in the same group
     * @param {Array[Array[Number]]} colInGroupCombinations - The list of column
     *        index list in the same group
     * @param {Number} charValSpacing - The character value spacing
     * @returns {Array[Object[Number, Number]]} The requested list of filled
     *                                          coordinates
     */
    const filledCoors = (difficulty, filledCoorNo, rowGroupCombination,
            colGroupCombination, rowInGroupCombinations,
            colInGroupCombinations, charValSpacing) => {
        const size = FMLAS.size(FMLAS.l(difficulty));
        // Swaps the rows first followed by swapping the columns
        return _reversedCoors(_swappedPortions(_reversedCoors(_swappedPortions(
                FM_BASE_FILLED_COORS(difficulty, filledCoorNo, charValSpacing),
                size, rowGroupCombination, rowInGroupCombinations)), size,
                colGroupCombination, colInGroupCombinations));
        //
    }; // filledCoors

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Number]} portionGroupCombination - The portion group index
     *                                                  list
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @returns {Array[Object[Number, Number]]} The requested list of filled
     *                                          coordinates
     */
    const _swappedPortions = (filledCoors, size, portionGroupCombination,
            portionInGroupCombinations) => {
        // Swaps the portion groups first followed by swapping portions in group
        return filledCoors.map(_filledCoorWithPortionGroupsSwapped.bind(this,
                size, portionGroupCombination)).map(
                _filledCoorWithPortionsSwappedInGroups.bind(this, size,
                portionInGroupCombinations));
        //
    }; // _swappedPortions

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Number]} portionGroupCombination - The portion group index
     *                                                  list
     * @param {Object[Number, Number]} filledCoor - The filled coordinates
     * @returns {Object[Number, Number]} The requested filled coordinates
     * @todo Makes it clear that rowIndex's that of the swapped primary axis
     */
    const _filledCoorWithPortionGroupsSwapped = (
            size, portionGroupCombination, filledCoor) => ({
        rowIndex: _portionGroupSwapIndex(
                size, portionGroupCombination, filledCoor.rowIndex),
        colIndex: filledCoor.colIndex
    }); // _filledCoorWithPortionGroupsSwapped

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Number]} portionGroupCombination - The portion group index
     *                                                  list
     * @param {Number} portionIndex - The coordinate portion to be swapped
     * @returns {Number} The requested index for swapping portion groups
     */
    const _portionGroupSwapIndex = (
            size, portionGroupCombination, portionIndex) => {
        return portionIndex + _portionGroupSwapOffset(size,
                portionGroupCombination, FMLAS.portionGroupIndex(portionIndex,
                size));
    }; // _portionGroupSwapIndex

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Number]} portionGroupCombination - The portion group index
     *                                                  list
     * @param {Number} origGroupNo - The original portion index group number
     * @returns {Number} The requested offset for swapping portion groups
     */
    const _portionGroupSwapOffset = (
            size, portionGroupCombination, origGroupNo) => {
        /** @todo: Extracts everything before * into a well-defined function */
        return (portionGroupCombination.indexOf(origGroupNo) - origGroupNo) *
                size;
        //
    }; // _portionGroupSwapOffset

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @param {Object[Number, Number]} filledCoor - The filled coordinates
     * @returns {Object[Number, Number]} The requested filled coordinates
     * @todo Makes it clear that rowIndex's that of the swapped primary axis
     */
    const _filledCoorWithPortionsSwappedInGroups = (
            size, portionInGroupCombinations, filledCoor) => ({
        rowIndex: _portionInGroupSwapIndex(
                size, portionInGroupCombinations, filledCoor.rowIndex),
        colIndex: filledCoor.colIndex
    }); // _filledCoorWithPortionsSwappedInGroups

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of rows in the same group
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @param {Number} portionIndex - The coordinate portion to be swapped
     * @returns {Number} The requested index for swapping portion groups
     */
    const _portionInGroupSwapIndex = (
            size, portionInGroupCombinations, portionIndex) => {
        return portionIndex + _portionInGroupSwapOffset(
                _portionInGroupCombination(size, portionInGroupCombinations,
                portionIndex), FMLAS.portionIndexInGroup(portionIndex, size));
    }; // _portionInGroupSwapIndex

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
     * @param {Array[Array[Number]]} portionInGroupCombinations - The list of
     *        portion group index list
     * @param {Number} origNoInGroup - The original portion index in the group
     * @returns {Number} The requested offset for swapping portion groups
     */
    const _portionInGroupSwapOffset = (
            portionInGroupCombinations, origNoInGroup) => {
        return portionInGroupCombinations.indexOf(origNoInGroup) -
                origNoInGroup;
    }; // _portionInGroupSwapOffset

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @returns {Array[Object[Number, Number]]} The requested list of filled
     *                                          coordinates in reversed forms
     */
    const _reversedCoors = filledCoors => filledCoors.map(_reversedCoor);

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object[Number, Number]} filledCoor - The filled coordinates
     * @returns {Object[Number, Number]} The requested reversed coordinates
     */
    const _reversedCoor = filledCoor => {
        // Makes use of the fact the 2D board's a square
        return { rowIndex: filledCoor.colIndex, colIndex: filledCoor.rowIndex };
        //
    }; // _reversedCoor

    return filledCoors;

}; // FMFilledCoors
