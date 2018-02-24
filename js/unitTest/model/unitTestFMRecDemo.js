/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFMRecDemo = SHOW_RESULT_MSGS => {

    "use strict";

    /**
     * No-op/Stub
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @returns {Object[Function]} The requested function mapping
     */
    const FMJSONIOStub = () => {

        "use strict";

        /**
         * Idempotent
         * @author DoubleX @interface @since v1.0 @version v1.0
         * @param {String} name - The name of the JSON to be written
         * @param {Object} contents - The contents of the JSON to be written
         */
        const exportJSON = (name, contents) => {
            _exportJSONInfo.push({ name, contents });
        }; // exportJSON

        return { exportJSON };

    }; // FMJSONIOStub

    const _BOARD = [
        ["0", "1", "2", "3"],
        ["2", "3", "1", "0"],
        ["1", "2", "3", "0"],
        ["3", "0", "1", "2"]
    ];
    const _DIFFICULTY = "relaxed", _FILLED_COORS = [
        { rowIndex: 0, colIndex: 0 },
        { rowIndex: 1, colIndex: 2 },
        { rowIndex: 2, colIndex: 1 },
        { rowIndex: 3, colIndex: 3 },
    ];
    const _EXPECTED_EXPORT_JSON_INFO = [
        {
            name: "D_relaxed_FCN_4_S_6.87",
            contents: {
                evs: {
                    "1.02": EVS.inputData(1, 0, "1"),
                    "2.01": EVS.inputData(0, 1, "1"),
                    "3.12": EVS.alertData(),
                    "4.32": EVS.inputData(0, 1, "2"),
                    "5.76": EVS.inputData(1, 1, "3")
                },
                difficulty: _DIFFICULTY,
                board: _BOARD,
                filledCoors: _FILLED_COORS
            }
        },
        {
            name: "D_relaxed_FCN_4_S_6.87",
            contents: {
                evs: {
                    "1.02": EVS.inputData(1, 0, "1"),
                    "2.01": EVS.inputData(0, 1, "1"),
                    "3.12": EVS.alertData(),
                    "4.32": EVS.inputData(0, 1, "2"),
                    "5.76": EVS.inputData(1, 1, "3")
                },
                difficulty: _DIFFICULTY,
                board: _BOARD,
                filledCoors: _FILLED_COORS
            }
        },
        {
            name: "D_relaxed_FCN_4_S_10.98",
            contents: {
                evs: {
                    "1.02": EVS.inputData(1, 0, "1"),
                    "2.01": EVS.inputData(0, 1, "1"),
                    "3.12": EVS.alertData(),
                    "4.32": EVS.inputData(0, 1, "2"),
                    "5.76": EVS.inputData(1, 1, "3"),
                    "2.01": EVS.inputData(0, 1, "1"),
                    "3.12": EVS.alertData(),
                    "4.32": EVS.inputData(0, 1, "2")
                },
                difficulty: _DIFFICULTY,
                board: _BOARD,
                filledCoors: _FILLED_COORS
            }
        },
        {
            name: "D_relaxed_FCN_4_S_10.98",
            contents: {
                evs: {
                    "1.02": EVS.inputData(1, 0, "1"),
                    "2.01": EVS.inputData(0, 1, "1"),
                    "3.12": EVS.alertData(),
                    "4.32": EVS.inputData(0, 1, "2"),
                    "5.76": EVS.inputData(1, 1, "3"),
                    "2.01": EVS.inputData(0, 1, "1"),
                    "3.12": EVS.alertData(),
                    "4.32": EVS.inputData(0, 1, "2")
                },
                difficulty: _DIFFICULTY,
                board: _BOARD,
                filledCoors: _FILLED_COORS
            }
        }
    ];
    const _FM_JSON_IO_STUB = FMJSONIOStub();
    const _FM_REC_DEMO = FMRecDemo(_FM_JSON_IO_STUB);
    const _IDENTICAL_CONTENT_KEYS = ["difficulty", "board", "filledCoors"];

    const _exportJSONInfo = [];

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFMRecDemo _unitTestAll");
        _exportJSONInfo.length = 0;
        // These tests are duplicated to ensure that this function's idempotent
        _FM_REC_DEMO.onStart(_DIFFICULTY, _BOARD, _FILLED_COORS);
        _FM_REC_DEMO.onStart(_DIFFICULTY, _BOARD, _FILLED_COORS);
        _FM_REC_DEMO.onRecInput("1.02", 1, 0, "1");
        _FM_REC_DEMO.onRecInput("1.02", 1, 0, "1");
        _FM_REC_DEMO.onRecInput("2.01", 0, 1, "1");
        _FM_REC_DEMO.onRecInput("2.01", 0, 1, "1");
        _FM_REC_DEMO.onAlertOk("3.12");
        _FM_REC_DEMO.onAlertOk("3.12");
        _FM_REC_DEMO.onRecInput("4.32", 0, 1, "2");
        _FM_REC_DEMO.onRecInput("4.32", 0, 1, "2");
        _FM_REC_DEMO.onRecInput("5.76", 1, 1, "3");
        _FM_REC_DEMO.onRecInput("5.76", 1, 1, "3");
        _FM_REC_DEMO.onWin("6.87"); // It doesn't care about whether it's real
        _FM_REC_DEMO.onWin("6.87"); // It'll lead to a duplicate demo
        _FM_REC_DEMO.onRecInput("7.98", 0, 1, "1");
        _FM_REC_DEMO.onRecInput("7.98", 0, 1, "1");
        _FM_REC_DEMO.onAlertOk("9.01");
        _FM_REC_DEMO.onAlertOk("9.01");
        _FM_REC_DEMO.onRecInput("10.32", 0, 1, "2");
        _FM_REC_DEMO.onRecInput("10.32", 0, 1, "2");
        _FM_REC_DEMO.onWin("10.98"); // It doesn't care about whether it's real
        _FM_REC_DEMO.onWin("10.98"); // It'll lead to a duplicate demo
        _FM_REC_DEMO.onMarkPlayDemo();
        _FM_REC_DEMO.onMarkPlayDemo();
        _FM_REC_DEMO.onWin("8.09"); // It doesn't care about whether it's real
        _FM_REC_DEMO.onWin("8.09"); // Neither will lead to saving a demo
        //
        SHOW_RESULT_MSGS(_unitTestFailMsgs()); // Check everything at once
        _exportJSONInfo.length = 0;
    }; // _unitTestAll

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestFailMsgs = () => {
        console.info("UnitTestFMRecDemo _unitTestFailMsgs");
        const demoNo = _exportJSONInfo.length, expectedDemoNo = 4;
        if (demoNo !== expectedDemoNo) return [
            `The number of demos should be ${expectedDemoNo} but is instead ` +
                    `${demoNo}!`
        ];
        return _exportJSONInfo.reduce(_accumUnitTestFailMsgs, []);
    }; // _unitTestFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} accumFailMsgs - The collected list of fail message
     * @param {Object} exportJSONInfo - The recorded demo contents to be tested
     * @param {Number} i - The index of the recorded demo contents to be tested
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumUnitTestFailMsgs = (accumFailMsgs, exportJSONInfo, i) => {
        console.info("UnitTestFMRecDemo _accumUnitTestFailMsgs");
        const expectedExportJSONInfo = _EXPECTED_EXPORT_JSON_INFO[i];
        console.info(`exportJSONInfo: ${JSON.stringify(exportJSONInfo)}`);
        console.info(`i: ${i}`);
        console.info("expectedExportJSONInfo: " +
                JSON.stringify(expectedExportJSONInfo));
        const name = exportJSONInfo.name;
        const expectedName = expectedExportJSONInfo.name;
        if (name !== expectedName) return accumFailMsgs.concat([
            `The name of the ${i + 1}th demo should be ${expectedName} but ` +
                    `is instead ${name}!`
        ]);
        const evNo = Object.keys(exportJSONInfo).length;
        const expectedEvNo = Object.keys(expectedExportJSONInfo).length;
        if (evNo !== expectedEvNo) return accumFailMsgs.concat([
            `The number of recorded events in the ${i + 1}th demo should` +
                    `be ${expectedEvNo} but is instead ${evNo}!`
        ]);
        const contents = exportJSONInfo.contents;
        const expectedContents = expectedExportJSONInfo.contents;
        return Object.entries(expectedContents.evs).reduce(
                _accumUnitTestEvFailMsgs.bind(this, contents.evs, i),
                accumFailMsgs.concat(
                _unitTestContentFailMsgs(i, contents, expectedContents)));
    }; // _accumUnitTestFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} i - The index of the recorded demo contents to be tested
     * @param {Object} contents - The recorded demo contents to be tested
     * @param {Object} expectedContents - The expected demo contents
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestContentFailMsgs = (i, contents, expectedContents) => {
        return _IDENTICAL_CONTENT_KEYS.reduce((accumFailMsgs, key) => {
            const content = contents[key];
            const expectedContent = expectedContents[key];
            if (content === expectedContent) return accumFailMsgs;
            return accumFailMsgs.concat([
                `The ${key} in the ${i + 1}th demo should be ` +
                        `${expectedContent} but is instead ${content}!`
            ]);
        }, []);
    }; // _unitTestContentFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object} exportJSONInfoContents - The recorded demo contents
     * @param {Number} i - The index of the recorded demo contents to be tested
     * @param {Array[String]} accumFailMsgs - The collected list of fail message
     * @param {String} elapsedS - The expected number of seconds elapsed
     * @param {Object} ev - The expected event to be recorded at that moment
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumUnitTestEvFailMsgs = (
            exportJSONInfoContents, i, accumFailMsgs, [elapsedS, ev]) => {
        const recordedEv = exportJSONInfoContents[elapsedS];
        if (!recordedEv) return accumFailMsgs.concat([
        `The ${i + 1}th demo should have recorded an event on ` +
                `${elapsedS} but instead isn't!`
        ]);
        if (EVS.isSame(ev, recordedEv)) return accumFailMsgs;
        return accumFailMsgs.concat([
            `The event recorded on ${elapsedS} for the ${i + 1}th demo ` +
                    `should be ${JSON.stringify(ev)} but is instead ` +
                    `${JSON.stringify(recordedEv)}!`
        ]);
    }; // _accumUnitTestEvFailMsgs

    console.info("UnitTestFMRecDemo pre");
    // These tests are duplicated to ensure that this function's idempotent
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFMRecDemo post");

}; // UnitTestFMRecDemo
