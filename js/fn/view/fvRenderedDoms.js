/**
 * Nullipotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Object[Function]} The requested API mapping
 */
const FVRenderedDoms = () => {

    "use strict";

    /**
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Object} dom - The dom to be rendered
     * @param {Function} fn - The function for rendering the dom
     * @param {Array} args - The list of arguments for rendering the dom
     * @returns {} The requested results
     */
    const callFn = (dom, fn, args) => dom[fn].apply(dom, args);

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Object} dom - The dom to be read
     * @param {String} prop - The property of the dom to be rendered
     * @returns {} The requested results
     */
    const getProp = (dom, prop) => dom[prop];

    return { callFn, getProp };

}; // FVRenderedDoms
