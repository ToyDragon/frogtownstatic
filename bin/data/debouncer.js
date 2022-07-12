"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debouncer = /** @class */ (function () {
    function Debouncer(delay) {
        var _this = this;
        this.waiting = false;
        this.inProgressRequest = null;
        this.delay = delay;
        this.lastAction = new Date();
        this.lastAction.setFullYear(1990);
        document.addEventListener('onbeforeunload', function () {
            if (_this.inProgressRequest) {
                _this.inProgressRequest(true);
                _this.inProgressRequest = null;
            }
        });
    }
    Debouncer.prototype.forceAct = function () {
        if (this.inProgressRequest) {
            this.inProgressRequest(false);
            this.inProgressRequest = null;
        }
        this.waiting = false;
    };
    Debouncer.prototype.waitAndShouldAct = function () {
        var _this = this;
        if (this.inProgressRequest) {
            this.inProgressRequest(false);
        }
        return new Promise(function (resolve) {
            _this.inProgressRequest = resolve;
            _this.lastAction = new Date();
            _this.tryWait();
        });
    };
    Debouncer.prototype.tryWait = function () {
        var _this = this;
        if (!this.inProgressRequest) {
            return;
        }
        if (this.waiting) {
            return;
        }
        var ellapsedMillis = new Date().getTime() - this.lastAction.getTime();
        if (ellapsedMillis > this.delay) {
            this.inProgressRequest(true);
            this.inProgressRequest = null;
        }
        else {
            this.waiting = true;
            var remainingTime = this.delay - ellapsedMillis;
            setTimeout(function () {
                _this.waiting = false;
                _this.tryWait();
            }, remainingTime);
        }
    };
    return Debouncer;
}());
exports.default = Debouncer;
//# sourceMappingURL=debouncer.js.map