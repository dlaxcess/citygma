'use strict';

const Helper = require('./CitygmaHelper');

(function(window, $) {
    let HelperInstance = new WeakMap();

    class CitygmaApp {
        constructor($wrapper) {
            this.$wrapper = $wrapper;
            HelperInstance.set(this, new Helper($wrapper));

            this.$wrapper.on(
                'click',
                '#enygma',
                this.HandleTest.bind(this)
            );
        }

        HandleTest() {
            console.log(HelperInstance.get(this).whatToSay());
        }
    }

    window.CitygmaApp = CitygmaApp;
})(window, jQuery);