var indexexe = (function () {
    function indexexe() {
        this._registry = {};
    }
    indexexe.prototype.getListeners = function (event) {
        var registry = this._registry || (this._registry = {});
        var callbacks = registry[event] || (registry[event] = []);
        return callbacks;
    };
    indexexe.prototype.on = function (event, callback) {
        var callbacks = this.getListeners(event);
        if (typeof callback !== 'function')
            throw new TypeError('Indexexe.on(): the 2nd argument must be a function.');
        callbacks.push(callback);
        return this;
    };
    indexexe.prototype.emit = function (event) {
        var args = Array.prototype.slice.call(arguments, 1);
        var callbacks = this.getListeners(event);
        var len = callbacks.length;
        if (len) {
            callbacks = callbacks.slice(0);
            for (var i = 0; i < len; i += 1) {
                if (typeof callbacks[i] === 'function') {
                    callbacks[i].apply(this, args);
                }
            }
        }
        return this;
    };
    indexexe.prototype.connect = function (databaseName, version) {
        var _this = this;
        var request = window.indexedDB.open(databaseName, version);
        request.addEventListener('success', function () {
            _this.db = request.result;
            _this.emit('open');
        });
        request.addEventListener('error', function () {
            _this.emit('error');
        });
        request.addEventListener('upgradeneeded', function () {
            _this.emit('upgradeneeded');
        });
    };
    indexexe.prototype.Schema = function () {
    };
    return indexexe;
}());
