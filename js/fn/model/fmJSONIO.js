/**
 * Idempotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Object[Function]} The requested function mapping
 */
const FMJSONIO = () => {

    "use strict";

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} name - The name of the JSON to be written
     * @param {Object} contents - The contents of the JSON to be written
     */
    const exportJSON = (name, contents) => {
        _exportJSONDom(name, JSON.stringify(contents)).dispatchEvent(
                _exportJSONEv());
    }; // exportJSON

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {File} file - The json file to be imported
     * @param {Function(Object)} callback - Returns the requested json contents
     * @param {Function(Event)} errback - Returns the failure event
     */
    const importJSON = (file, callback, errback) => {
        const fileReader = new FileReader();
        fileReader.onerror = errback;
        fileReader.onload = _onImportJSONOk.bind(this, callback, fileReader);
        fileReader.readAsText(file);
    }; // importJSON

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} name - The name of the JSON to be written
     * @param {String} contents - The contents of the JSON to be written
     * @returns {Dom} The requested dom
     */
    const _exportJSONDom = (name, contents) => {
        const a = document.createElement('a');
        // All of these are too obvious, stable and trivial to be extracted
        a.download = name + ".json";
        a.href = window.URL.createObjectURL(_jsonBlob(contents));
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        //
        return a;
    }; // _exportJSONDom

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} contents - The contents of the JSON to be written
     * @returns {Blob} The requested json blob
     */
    const _jsonBlob = contents => new Blob([contents], { type: "text/json" });

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @returns {Event} The requested event
     */
    const _exportJSONEv = () => {
        const ev = document.createEvent('MouseEvents');
        ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false,
                false, false, false, 0, null);
        return ev;
    }; // _exportJSONEv

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Function(Object)} callback - Returns the requested json contents
     * @param {FileReader} fileReader - Reads the json file to be imported
     */
    const _onImportJSONOk = (callback, fileReader) => {
        callback(JSON.parse(fileReader.result));
    }; // _onImportJSONOk

    return { exportJSON, importJSON };

}; // FMJSONIO
