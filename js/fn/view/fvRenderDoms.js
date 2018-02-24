/**
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Object[Function]} The requested API mapping
 */
const FVRenderDoms = () => {

    "use strict";

    /**
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Object} dom - The dom to be rendered
     * @param {Function} fn - The function for rendering the dom
     * @param {Array} args - The list of arguments for rendering the dom
     */
    const callFn = (dom, fn, args) => { dom[fn].apply(dom, args); };

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Object} dom - The dom to be rendered
     * @param {String} prop - The property of the dom to be rendered
     * @param {String} val - The value of the property to be rendered
     */
    const setProp = (dom, prop, val) => {
        if (dom[prop] !== val) dom[prop] = val;
    }; // setProp

    return { callFn, setProp };

}; // FVRenderDoms
