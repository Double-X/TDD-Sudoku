/**
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Object[Function]} The requested function mapping
 */
const FVVisibility = () => {

    "use strict";

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} oldVisibility - The css class as the old dom visibility
     * @param {String} newVisibility - The css class as the new dom visibility
     * @param {Dom} dom - The dom to have its visibility changed
     */
    const _changeVisibility = (oldVisibility, newVisibility, dom) => {
        const classList = dom.classList;
        classList.remove(oldVisibility);
        classList.add(newVisibility);
    }; // _changeVisibility

    return {
        beVisible: _changeVisibility.bind(this, "invisible", "visible"),
        beInvisible: _changeVisibility.bind(this, "visible", "invisible")
    };

}; // FVVisibility
