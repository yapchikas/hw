window.app = window.app || {};
window.app.createCounters = function () {
    let counters = 0;

    // SL - this is in wrong place, you need to increment once each time createCounter is called
    counters++;

    return {
        createCounter: () => {
            let number = 0;
            function increment() {
                ++number;
            }
            function get() {
                return number;
            }

            return {
                increment,
                get
            };
        },

        total: () => {
            return counters;
        }
    };
}();

// SL - nice!
