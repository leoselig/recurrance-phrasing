var dot = require('dot');
var i18n;

var enumerateWeekDays = function(weekDays) {
    return weekDays.map(function(weekDayNumber) {
        return i18n.weekDays[weekDayNumber];
    }).join(', ');
};

var dailyString = function(weekDays) {
    weekDays = weekDays.sort();
    if (weekDays.length === 7) {
        return dot.template(i18n.daily.each)();
    } else {
        return dot.template(i18n.daily.some)({
            weekDays: enumerateWeekDays(weekDays)
        });
    }
};

var monthName = function(monthIndex) {
    return dot.template(i18n.months[monthIndex])();
};

var localDate = function(date) {
    return dot.template(i18n.formats.date)({
        year: date.getFullYear(),
        month: date.getMonth(),
        monthName: monthName(date.getMonth()),
        day: date.getDate()
    });
};

var event = function(startTime, endTime) {

    var repititionString;
    var endString;

    return {

        endsAfter: function(numberOccurances) {
            endString = dot.template(i18n.seriesEnd.occurances)({
                number: numberOccurances
            });
            return this;
        },

        endsOn: function(date) {
            endString = dot.template(i18n.seriesEnd.date)({
                date: localDate(date)
            });
            return this;
        },

        dailyOn: function(weekDays) {
            repititionString = dailyString(weekDays);
            return this;
        },

        weeklyEvery: function(weekInterval, weekDays) {
            var weekPhrase;
            if (weekInterval === 1) {
                weekPhrase = dot.template(i18n.weekly.each)();
            } else {
                weekPhrase = dot.template(i18n.weekly.interval)({
                    interval: weekInterval
                });
            }
            repititionString = weekPhrase + ', ' + dailyString(weekDays)
            return this;
        },

        monthlyEvery: function(monthInterval, weekDays) {
            var monthPhrase;
            if (monthInterval === 1) {
                monthPhrase = dot.template(i18n.monthly.each)();
            } else {
                monthPhrase = dot.template(i18n.monthly.interval)({
                    interval: monthInterval
                });
            }
            repititionString = monthPhrase + ', ' + dailyString(weekDays)
            return this;
        },

        yearEvery: function(yearInterval) {
            if (yearInterval === 1) {
                repititionString = dot.template(i18n.yearly.each)();
            } else {
                repititionString = dot.template(i18n.yearly.interval)({
                    interval: yearInterval
                });
            }
            return this;
        },

        formulate: function() {
            var result = repititionString;
            if (endString) {
                result += ', ' + endString;
            }
            return result;
        }

    };

};

event.i18n = function(object) {
    i18n = object;
};

module.exports = event;
