/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Function(String) -> Object[Number, Number]} The requested function
 */
const FMFilledCoorNoMinMax = () => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @returns {Object[Number, Number]} The requested minimum and maximum
     */
    const filledCoorNoMinMax = difficulty => {
        // It's so easy, simple and small that it doesn't need unit tests
        const l = FMLAS.l(difficulty);
        return { min: l, max: l * (l - 2) };
        //
    }; // filledCoorNoMinMax

    return filledCoorNoMinMax;

}; // FMFilledCoorNoMinMax
