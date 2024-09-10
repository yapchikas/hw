window.app = window.app || {};
window.app.createCounters = function () {
    let counters = 0;
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

