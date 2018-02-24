/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Array[String]} FNS - The list of names of functions to be tested
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFV = (FNS, SHOW_RESULT_MSGS) => {

    /**
     * No-op/Stub
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Function(String, String, Function, Array)} CALLBACK -
     *         The function checking the API calls
     * @returns {Object[Function]} The requested API mapping
     */
    const FVRenderDomsStub = CALLBACK => {

        "use strict";

        /**
         * @author DoubleX @interface @since v1.0 @version v1.0
         * @param {Object} dom - The dom to be rendered
         * @param {Function} fn - The function for rendering the dom
         * @param {Array} args - The list of arguments for rendering the dom
         */
        const callFn = (dom, fn, args) => {
            // Just checking against the dom id's enough for dom arguments
            CALLBACK("callFn", dom.id, fn, args.map(arg => arg.id || arg));
            //
        }; // callFn

        /**
         * Idempotent
         * @author DoubleX @interface @since v1.0 @version v1.0
         * @param {Object} dom - The dom to be rendered
         * @param {String} prop - The property of the dom to be rendered
         * @param {String} val - The value of the property to be rendered
         */
        const setProp = (dom, prop, val) => {
            CALLBACK("setProp", dom.id, prop, val);
        }; // setProp

        return { callFn, setProp };

    }; // FVRenderDomsStub

    /**
     * No-op/Stub
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Function(String, String, Function, Array)} CALLBACK -
     *         The function checking the API calls
     * @returns {Function(Object, String) -> *} The requested function
     */
    const FVRenderedDomsStub = CALLBACK => {

        "use strict";

        /**
         * @author DoubleX @interface @since v1.0 @version v1.0
         * @param {Object} dom - The dom to be rendered
         * @param {Function} fn - The function for rendering the dom
         * @param {Array} args - The list of arguments for rendering the dom
         * @returns {} The requested results
         */
        const callFn = (dom, fn, args) => CALLBACK("callFn", dom, fn, args);

        /**
         * Nullipotent
         * @author DoubleX @interface @since v1.0 @version v1.0
         * @param {Object} dom - The dom to be rendered
         * @param {String} prop - The property of the dom to be rendered
         * @returns {} The requested results
         */
        const getProp = (dom, prop) => CALLBACK("getProp", dom, prop);

        return { callFn, getProp };

    }; // FVRenderedDomsStub

    const _FNS = {
        FVRenderedFixedSq:
              UnitTestFVRenderedFixedSq.bind(this, SHOW_RESULT_MSGS),
        FVRenderedSq: UnitTestFVRenderedSq.bind(this, SHOW_RESULT_MSGS),
        FVRenderedSqs: UnitTestFVRenderedSqs.bind(
                this, FVRenderedDomsStub, SHOW_RESULT_MSGS),
        FVRenderSqs: UnitTestFVRenderSqs.bind(
                this, FVRenderDomsStub, SHOW_RESULT_MSGS)
    };

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        "use strict";
        console.info("UnitTestFV _unitTestAll");
        FNS.forEach(fn => { if (_FNS[fn]) _FNS[fn](); });
    }; // _unitTestAll

    console.info("UnitTestFV pre");
    // These tests are duplicated to ensure that the functions' idempotent
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFV post");

}; // UnitTestFV
