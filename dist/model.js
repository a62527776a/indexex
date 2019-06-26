(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.model = function (modelName, Schema) {
        return Model;
    };
    var Model = (function () {
        function Model() {
        }
        Model.prototype.find = function () {
        };
        return Model;
    }());
});
