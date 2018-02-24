/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Function(Array, Number) -> Array} The requested function
 */
const FMPickedCombination = () => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Array} elements - The list of elements to have their combinations
     * @param {Number} combinationNo - The number identifying the combination
     * @returns {Array} The requested combination
     */
    const combination = (elements, combinationNo) => {
        // Not inlining _isFirst is to be the abstraction counterpart of _isLast
        if (_isFirst(combinationNo)) return elements;
        //
        const l = elements.length;
        if (_isLast(combinationNo, l)) return _reversed(elements);
        // These are not extracted into function to preserve the tail recursion
        const newElements = elements.slice();
        return newElements.splice(_combinationHeadIndex(combinationNo, l), 1).
                concat(combination(newElements, _newCombinationNo(
                combinationNo, l)));
        //
    }; // combination

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} combinationNo - The number identifying the combination
     * @returns {Boolean} The check result
     */
    const _isFirst = combinationNo => combinationNo === 1;

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} combinationNo - The number identifying the combination
     * @param {Number} l - The number of elements
     * @returns {Boolean} The check result
     */
    const _isLast = (combinationNo, l) => combinationNo === _factorial(l);

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array} elements - The list of elements to have their combinations
     * @returns {Array} The requested combination
     */
    const _reversed = elements => elements.slice().reverse();

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} combinationNo - The number identifying the combination
     * @param {Number} l - The number of elements
     * @returns {Number} The requested index of the 1st element in combination
     */
    const _combinationHeadIndex = (combinationNo, l) => {
        return Math.floor((combinationNo - 1) / _factorial(l - 1));
    }; // _combinationHeadIndex

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} combinationNo - The number identifying the combination
     * @param {Number} l - The number of elements
     * @returns {Number} The requested new number identifying the combination
         */
    const _newCombinationNo = (combinationNo, l) => {
        return (combinationNo - 1) % _factorial(l - 1) + 1;
    }; // _newCombinationNo

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} no - The number to have its factorial
     * @returns {Number} The requested factorial
     */
    const _factorial = no => no > 0 ? no * _factorial(no - 1) : 1;

    return combination;

}; // FMPickedCombination
