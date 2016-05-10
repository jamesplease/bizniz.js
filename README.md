# bizniz

Constant-time business utilities for the western work week

[![Travis build status](http://img.shields.io/travis/jmeas/bizniz.js.svg?style=flat)](https://travis-ci.org/jmeas/bizniz.js)
[![Code Climate](https://codeclimate.com/github/jmeas/bizniz.js/badges/gpa.svg)](https://codeclimate.com/github/jmeas/bizniz.js)
[![Test Coverage](https://codeclimate.com/github/jmeas/bizniz.js/badges/coverage.svg)](https://codeclimate.com/github/jmeas/bizniz.js)
[![Dependency Status](https://david-dm.org/jmeas/bizniz.js.svg)](https://david-dm.org/jmeas/bizniz.js)
[![devDependency Status](https://david-dm.org/jmeas/bizniz.js/dev-status.svg)](https://david-dm.org/jmeas/bizniz.js#info=devDependencies)

### About

Utilities to do calculations with work weeks are common on the 'net, but many
of them loop over every day in a given interval for their calculations. Loops
are easy for humans to write, but slow for computers to resolve. In fact,
the larger the interval, the longer those looping calculations takes.

This library is a collection of constant-time utilities that produce the
same result as the looping approach, yet are computed the same speed no matter
how large your time scale is. Three days will be computed just as fast as a
million days.

### Getting Started

Install this library with npm.

```js
npm install bizniz
```

Import it into your application, and use the main export.

```js
import bizniz from 'bizniz';

const daysBetween = bizniz.addWeekDays(day, 20);
```

### Inclusive and Exclusive Intervals

Working with intervals of time is a surprisingly nuanced topic. When a function
accepts two dates, there's an option question of whether each of those days
is included in the interval or not. If one of the days **is** included, then
that's called an inclusive endpoint. Otherwise, it's an exclusive endpoint.

For instance, consider the question of how many days are between March 1, 2016,
and March 1, 2016. If the start and end are both inclusive, then the answer is
1. If either, or both endpoints are exclusive, then the answer is 0.

Using any algorithm that involves two dates may produce unexpected results if
you're not sure how it treats the endpoints.

There is much discussion about the endpoints of time intervals. Many people
believe that exclusively using inclusive starts and exclusive ends lead to the
least headaches. I agree with them, which is why the two interval functions in
this library, `weekDaysBetween` and `weekendDaysBetween`, are calculated with an
inclusive start and an exclusive end.

### API

##### `isWeekDay( date )`

Returns a boolean representing whether or not `date` is a week day. `date` must
be a JavaScript Date object.

##### `isWeekendDay( date )`

Like `isWeekDay`, but for weekends. Pass in a `date`, and you'll get back a
boolean.

##### `weekDaysBetween( startDate, endDate )`

Computes the number of week days between `startDate` and `endDate`. If `endDate`
is after `startDate`, then the number returned will be positive. Otherwise,
it will be negative.

##### `weekendDaysBetween( startDate, endDate )`

Just like `weekDaysBetween`, but for the weekend.

##### `addWeekDays( date, days )`

Pass in `days`, which is a number of week days, and a `date`, and a new Date
object will be returned representing the addition of the two. Accepts positive
and negative `days`.

##### `subtractWeekDays( date, days )`

Just like `addWeekDays`, but in the opposite direction. It, too, accepts
positive and negative values.

##### `dateIsBefore( startDate, endDate )`

Returns `true` is `startDate` comes before `endDate`. Otherwise, it returns
`false`.

##### `daysBetween( startDate, endDate )`

Returns the total number of days between `startDate` and `endDate`, including
both week days and weekend days. If `endDate` comes before `startDate`, then the
value will be negative.

##### `addDays( date, days )`

Adds `days` number of days to `date`. Returns a new Date object.
