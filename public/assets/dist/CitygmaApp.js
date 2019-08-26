'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, $) {
    var HelperInstance = new Map();

    var CitygmaApp = function () {
        function CitygmaApp($wrapper) {
            _classCallCheck(this, CitygmaApp);

            this.$wrapper = $wrapper;
            HelperInstance.set(this, new Helper($wrapper));

            this.$wrapper.on('click', '#enygma', this.HandleTest.bind(this));
        }

        _createClass(CitygmaApp, [{
            key: 'HandleTest',
            value: function HandleTest() {
                console.log(HelperInstance.get(this).whatToSay());
            }
        }]);

        return CitygmaApp;
    }();

    var Helper = function () {
        function Helper($wrapper) {
            _classCallCheck(this, Helper);

            this.$wrapper = $wrapper;
        }

        _createClass(Helper, [{
            key: 'whatToSay',
            value: function whatToSay() {
                return 'todo delete';
            }
        }]);

        return Helper;
    }();

    window.CitygmaApp = CitygmaApp;
})(window, jQuery);
