#Getting Started
##For browsers
Simply download the file `build/recurrance-phrasing.js` - it already contains its only dependency.
The library will expose `recurrancePhrasing` on the global scope.

##For Node.JS
Just run
```npm install recurrance-phrasing --save```

##I18N
This library expects you to fill it with the I18N you wish it to use. An English and a German i18n file are located in `i18n/`. If you want your own languages to be supported stick to the format in those files and just translate accordingly. :)
To setup the library for a specific i18n you have to call

```javascript
recurrancePhrasing.i18n(i18nObject);
```

#Usage
Whenever you want a recurrence pattern to be formulated you first have to do:

```javascript
var phrasing = reccurencePhrasing(
    startDate,
    endDate
);
```

where `startDate` and `endDate` are simple JavaScript `Date` objects.

**API**
Daily events on certain days of the week:
```javascript
phrasing.dailyOn(Array weekDays):
```
where `weekDays` is an array of numbers between 0-6 (Monday to Sunday).

Every **n** weeks on certain days of the week:
```javascript
phrasing.weeklyEvery(Number weekInterval, Array weekDays):
```
where `weekDays` is an array of numbers between 0-6 (Monday to Sunday).

Every **n** months on certain days of the week:
```javascript
phrasing.monthlyEvery(Number weekInterval, Array weekDays):
```
where `weekDays` is an array of numbers between 0-6 (Monday to Sunday).

Every **n** years:
```javascript
phrasing.yearlyEvery(Number yearInterval):
```

Series ends after **n** occurances:
```javascript
phrasing.endsAfter(Number numberOccurance):
```

Series ends on a certain date:
```javascript
phrasing.endsOn(Date seriesEndDate):
```

Finally, call this to receive a translated, human-readable string:
```phrasing.formulate```