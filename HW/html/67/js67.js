"use strict";
 



 
 const dayOfWeekConverter = (function () {

    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thusrday","Friday","Shabbos"];   
    
    function getDayOfWeek(number)
    {
    return daysOfWeek[number-1];
    }

    function getDayNumber (day)
    {
        for (let i= 0; i<7; i++)
        {
            if (day.toLowerCase === daysOfWeek[i].toLowerCase)
            {
                return i+1 ;
            }
        }
   
    }

}());

(function calculator() {
    let rate = 10;
    let years = 30;

    function calcInterest(principle) {
        return principle * rate * years;
    }

    return {
        setRate(r) {
            rate = r;
        },
        setYears(y) {
            years = y;
        },
        calcInterest
    };
}());
