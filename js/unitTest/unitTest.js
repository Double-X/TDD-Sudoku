// The list of names of functions having unit tests
const UNIT_TEST_FNS = [
    "FMBaseBoard",
    "FMBoard",
    "FMNewBoard",
    "FMBaseFilledCoors",
    "FMFilledCoors",
    "FMNewFilledCoors",
    "FMInputViolations",
    "FMIsWon",
    "FMPickedCombination",
    "FMRecDemo",
    "FVRenderedFixedSq",
    "FVRenderedSq",
    "FVRenderedSqs",
    "FVRenderSqs"
];
//

/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Array[String]} FNS - The list of names of functions to be tested
 */
const UnitTest = (FNS = UNIT_TEST_FNS) => {

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} failMsgs - The list of failure reasons to be shown
     */
    const _showResultMsgs = failMsgs => {
        "use strict";
        if (failMsgs.length <= 0) return console.info("Passed!");
        failMsgs.forEach(_showFailMsg);
        _showFailStackTrace();
    }; // _showResultMsgs

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} failMsg - The failure reasons to be shown
     */
    const _showFailMsgStackTrace = failMsg => {
        "use strict";
        _showFailMsg(failMsg);
        _showFailStackTrace();
    }; // _showFailMsgStackTrace

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} failMsg - The failure reasons to be shown
     */
    const _showFailMsg = failMsg => {
        "use strict";
        console.warn(`Failed! Reason: ${failMsg}`);
    }; // _showFailMsg

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _showFailStackTrace = () => {
        "use strict";
        console.warn("The stacktrace leading to this failed test:");
        console.trace();
    }; // _showFailStackTrace

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        "use strict";
        console.info("UnitTest _unitTestAll");
        UnitTestFM(FNS, _showResultMsgs, _showFailMsgStackTrace);
        UnitTestFV(FNS, _showResultMsgs);
    }; // _unitTestAll

    console.info("UnitTest pre");
    // These tests are duplicated to ensure that the functions' idempotent
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTest post");

}; // UnitTest
