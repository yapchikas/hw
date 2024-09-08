
window.app = window.app || {};
app.createCounters = function () {
    let counters = 0;
    counters++;



    return {
        
        createCounter: () => {
            let number = 0;
            function increment() {
                ++number
            };
            function get() {
                return number
            }

            return {
                increment,
                get
            }
        },
        
        total: () => {
            return counters
        }

    }
}();

