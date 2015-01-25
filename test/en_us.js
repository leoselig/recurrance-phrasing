var phrase = require('../index');
var expect = require('chai').expect;

describe('english (US)', function() {

    before(function() {
        phrase.i18n(require('../i18n/en_us.json'))
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
                .to.equal('Every day');
        });

        it('on multiple week days', function() {
            expect(event.dailyOn([3, 6, 2]).formulate())
                .to.equal('Every Wednesday, Thursday, Sunday');
        });

        describe('can end', function() {

            it('after a number of occurances', function() {
                expect(event.endsAfter(2).dailyOn([3, 6, 2]).formulate())
                    .to.equal('Every Wednesday, Thursday, Sunday, ends after 2 occurances');
            });

            it('on a specific date', function() {
                expect(event.endsOn(
                        new Date(2015, 2, 13)
                    ).dailyOn([3, 6, 2]).formulate())
                    .to.equal('Every Wednesday, Thursday, Sunday, ends on March 13, 2015');
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
                .to.equal('Every week, Every Monday, Tuesday, Wednesday');
        });

        it('every 2 weeks', function() {
            expect(event.weeklyEvery(2, [0, 1, 2]).formulate())
                .to.equal('Every 2 weeks, Every Monday, Tuesday, Wednesday');
        });

        describe('can end', function() {

            it('after a number of occurances', function() {
                expect(event.endsAfter(4).weeklyEvery(2, [0, 1, 2]).formulate())
                    .to.equal('Every 2 weeks, Every Monday, Tuesday, Wednesday, ends after 4 occurances');
            });

            it('on a specific date', function() {
                expect(event.endsOn(
                        new Date(2016, 11, 24)
                    ).weeklyEvery(2, [0, 1, 2]).formulate())
                    .to.equal('Every 2 weeks, Every Monday, Tuesday, Wednesday, ends on December 24, 2016');
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
                .to.equal('Every month, Every Monday, Tuesday, Wednesday');
        });

        it('every 2 month', function() {
            expect(event.monthlyEvery(2, [0, 1, 2]).formulate())
                .to.equal('Every 2 months, Every Monday, Tuesday, Wednesday');
        });

        describe('can end', function() {

            it('after a number of occurances', function() {
                expect(event.endsAfter(4).monthlyEvery(2, [0, 1, 2]).formulate())
                    .to.equal('Every 2 months, Every Monday, Tuesday, Wednesday, ends after 4 occurances');
            });

            it('on a specific date', function() {
                expect(event.endsOn(
                        new Date(2016, 11, 24)
                    ).monthlyEvery(2, [0, 1, 2]).formulate())
                    .to.equal('Every 2 months, Every Monday, Tuesday, Wednesday, ends on December 24, 2016');
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
                .to.equal('Every year');
        });

        it('every 2 years', function() {
            expect(event.yearEvery(2).formulate())
                .to.equal('Every 2 years');
        });

        describe('can end', function() {

            it('after a number of occurances', function() {
                expect(event.endsAfter(4).yearEvery(2).formulate())
                    .to.equal('Every 2 years, ends after 4 occurances');
            });

            it('on a specific date', function() {
                expect(event.endsOn(
                        new Date(2016, 11, 24)
                    ).yearEvery(2).formulate())
                    .to.equal('Every 2 years, ends on December 24, 2016');
            });

        });

    });

});
