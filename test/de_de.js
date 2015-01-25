var phrase = require('../index');
var expect = require('chai').expect;

describe('german', function() {

    before(function() {
        phrase.i18n(require('../i18n/de_de.json'))
    });

    describe('daily events', function() {

        var event;

        beforeEach(function() {
            event = phrase(
                new Date(20015, 1, 24, 11, 0, 0),
                new Date(20015, 1, 24, 12, 0, 0)
            );
        });

        it('on each week day', function() {
            expect(event.dailyOn([3, 4, 5, 6, 0, 1, 2]).formulate())
                .to.equal('Jeden Tag');
        });

        it('on multiple week days', function() {
            expect(event.dailyOn([3, 6, 2]).formulate())
                .to.equal('Jeden Mittwoch, Donnerstag, Sonntag');
        });

        describe('can end', function() {

            it('after a number of occurances', function() {
                expect(event.endsAfter(2).dailyOn([3, 6, 2]).formulate())
                    .to.equal('Jeden Mittwoch, Donnerstag, Sonntag, endet nach 2 Veranstaltungen');
            });

            it('on a specific date', function() {
                expect(event.endsOn(
                        new Date(2015, 2, 13)
                    ).dailyOn([3, 6, 2]).formulate())
                    .to.equal('Jeden Mittwoch, Donnerstag, Sonntag, endet am 13. März 2015');
            });

        });

    });

    describe('weekly events', function() {

        beforeEach(function() {
            event = phrase(
                new Date(20015, 1, 24, 11, 0, 0),
                new Date(20015, 1, 24, 12, 0, 0)
            );
        });

        it('every week', function() {
            expect(event.weeklyEvery(1, [0, 1, 2]).formulate())
                .to.equal('Jede Woche, Jeden Montag, Dienstag, Mittwoch');
        });

        it('every 2 weeks', function() {
            expect(event.weeklyEvery(2, [0, 1, 2]).formulate())
                .to.equal('Jede 2. Woche, Jeden Montag, Dienstag, Mittwoch');
        });

        describe('can end', function() {

            it('after a number of occurances', function() {
                expect(event.endsAfter(4).weeklyEvery(2, [0, 1, 2]).formulate())
                    .to.equal('Jede 2. Woche, Jeden Montag, Dienstag, Mittwoch, endet nach 4 Veranstaltungen');
            });

            it('on a specific date', function() {
                expect(event.endsOn(
                        new Date(2016, 11, 24)
                    ).weeklyEvery(2, [0, 1, 2]).formulate())
                    .to.equal('Jede 2. Woche, Jeden Montag, Dienstag, Mittwoch, endet am 24. Dezember 2016');
            });

        });

    });

    describe('monthly events', function() {

        var event;

        beforeEach(function() {
            event = phrase(
                new Date(20015, 1, 24, 11, 0, 0),
                new Date(20015, 1, 24, 12, 0, 0)
            );
        });

        it('every month', function() {
            expect(event.monthlyEvery(1, [0, 1, 2]).formulate())
                .to.equal('Jeden Monat, Jeden Montag, Dienstag, Mittwoch');
        });

        it('every 2 month', function() {
            expect(event.monthlyEvery(2, [0, 1, 2]).formulate())
                .to.equal('Jeden 2. Monat, Jeden Montag, Dienstag, Mittwoch');
        });

        describe('can end', function() {

            it('after a number of occurances', function() {
                expect(event.endsAfter(4).monthlyEvery(2, [0, 1, 2]).formulate())
                    .to.equal('Jeden 2. Monat, Jeden Montag, Dienstag, Mittwoch, endet nach 4 Veranstaltungen');
            });

            it('on a specific date', function() {
                expect(event.endsOn(
                        new Date(2016, 11, 24)
                    ).monthlyEvery(2, [0, 1, 2]).formulate())
                    .to.equal('Jeden 2. Monat, Jeden Montag, Dienstag, Mittwoch, endet am 24. Dezember 2016');
            });

        });

    });

    describe('yearly events', function() {

        var event;

        beforeEach(function() {
            event = phrase(
                new Date(20015, 1, 24, 11, 0, 0),
                new Date(20015, 1, 24, 12, 0, 0)
            );
        });

        it('every year', function() {
            expect(event.yearEvery(1).formulate())
                .to.equal('Jedes Jahr');
        });

        it('every 2 years', function() {
            expect(event.yearEvery(2).formulate())
                .to.equal('Jedes 2. Jahr');
        });

        describe('can end', function() {

            it('after a number of occurances', function() {
                expect(event.endsAfter(4).yearEvery(2).formulate())
                    .to.equal('Jedes 2. Jahr, endet nach 4 Veranstaltungen');
            });

            it('on a specific date', function() {
                expect(event.endsOn(
                        new Date(2016, 11, 24)
                    ).yearEvery(2).formulate())
                    .to.equal('Jedes 2. Jahr, endet am 24. Dezember 2016');
            });

        });

    });

});
