(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["bizniz"] = factory();
	else
		root["bizniz"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _containedPeriodicValues = __webpack_require__(1);
	
	var _containedPeriodicValues2 = _interopRequireDefault(_containedPeriodicValues);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var WEEKEND_DAYS = [0, 6];
	// The number of milliseconds in one day
	var MS_PER_DAY = 24 * 60 * 60 * 1000;
	
	// `date` - The Date to be coerced to UTC time
	// Returns a new `Date` object.
	function treatAsUTC(date) {
	  var result = new Date(date);
	  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
	  return result;
	}
	
	// Math.sign polyfill
	function determineSign(x) {
	  x = +x;
	  return x > 0 ? 1 : -1;
	}
	
	var bizniz = {
	  dateIsBefore: function dateIsBefore(startDate, endDate) {
	    return startDate.getTime() < endDate.getTime();
	  },
	  daysBetween: function daysBetween(startDate, endDate) {
	    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / MS_PER_DAY;
	  },
	  addDays: function addDays(date, days) {
	    var result = new Date(date.getTime());
	    result.setDate(result.getDate() + days);
	    return result;
	  },
	  isWeekDay: function isWeekDay(date) {
	    return WEEKEND_DAYS.indexOf(date.getDay()) === -1;
	  },
	  isWeekendDay: function isWeekendDay(date) {
	    return !this.isWeekDay(date);
	  },
	  weekDaysBetween: function weekDaysBetween(startDate, endDate) {
	    var start = void 0,
	        end = void 0;
	    var reverse = this.dateIsBefore(endDate, startDate);
	    if (reverse) {
	      start = endDate;
	      end = startDate;
	    } else {
	      start = startDate;
	      end = endDate;
	    }
	
	    var startDay = start.getDay();
	    var totalDays = Math.abs(this.daysBetween(start, end));
	    var containedSundays = (0, _containedPeriodicValues2.default)(startDay, totalDays + startDay, 0, 7);
	    var containedSaturdays = (0, _containedPeriodicValues2.default)(startDay, totalDays + startDay, 6, 7);
	    var coefficient = reverse ? -1 : 1;
	
	    return coefficient * (totalDays - (containedSaturdays + containedSundays));
	  },
	  weekendDaysBetween: function weekendDaysBetween(startDate, endDate) {
	    var totalDaysDiff = this.daysBetween(startDate, endDate);
	    var weekDays = this.weekDaysBetween(startDate, endDate);
	
	    return totalDaysDiff - weekDays;
	  },
	  addWeekDays: function addWeekDays(date, days) {
	    if (days === 0 || isNaN(days)) {
	      return new Date(date);
	    }
	
	    var sign = determineSign(days);
	    var day = date.getDay();
	    var absIncrement = Math.abs(days);
	
	    var days = 0;
	
	    if (day === 0 && sign === -1) {
	      days = 1;
	    } else if (day === 6 && sign === 1) {
	      days = 1;
	    }
	
	    // Add padding for weekends.
	    var paddedAbsIncrement = absIncrement;
	    if (day !== 0 && day !== 6 && sign > 0) {
	      paddedAbsIncrement += day;
	    } else if (day !== 0 && day !== 6 && sign < 0) {
	      paddedAbsIncrement += 6 - day;
	    }
	    var weekendsInbetween = Math.max(Math.floor(paddedAbsIncrement / 5) - 1, 0) + (paddedAbsIncrement > 5 && paddedAbsIncrement % 5 > 0 ? 1 : 0);
	
	    // Add the increment and number of weekends.
	    days += absIncrement + weekendsInbetween * 2;
	
	    return this.addDays(date, sign * days);
	  },
	  subtractWeekDays: function subtractWeekDays(date, days) {
	    return this.addWeekDays(date, -days);
	  }
	};
	
	exports.default = bizniz;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? module.exports = factory(__webpack_require__(2)) : typeof define === "function" && define.amd ? define(["nearest-periodic-value"], factory) : global.containedPeriodicValues = factory(global.nearestPeriodicValue);
	})(this, function (nearestPeriodicValue) {
	  "use strict";
	
	  function containedPeriodicValues(start, end, value, period) {
	    // Inclusive start; exclusive end
	    if (start === end) {
	      return 0;
	    }
	
	    // Flip our interval if it isn't ordered properly
	    if (start > end) {
	      var newEnd = start;
	      start = end;
	      end = newEnd;
	    }
	
	    // Make our interval have an exclusive end
	    end--;
	
	    var nearest = nearestPeriodicValue(start, value, period);
	
	    // Ensure that the nearest value is in front of the start
	    // of the interval
	    if (nearest - start < 0) {
	      nearest += period;
	    }
	
	    // If we can't even reach the first value, then it is 0
	    if (nearest - start > end - start) {
	      return 0;
	    }
	
	    // Otherwise, we have reached it, so we start with 1.
	    // Then we add one for every full period in our interval
	    else {
	      return 1 + parseInt((end - nearest) / period);
	    }
	  }
	
	  var contained_periodic_values = containedPeriodicValues;
	
	  return contained_periodic_values;
	});
	//# sourceMappingURL=./contained-periodic-values.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.nearestPeriodicValue = factory();
	})(this, function () {
	  "use strict";
	
	  /*jshint -W018 */
	
	  function nearestPeriodicValue(point, value, period) {
	    var relation = (value - point) / period;
	
	    // We're equidistant from the nearest point if the
	    // distance from the point is a half-integer value
	    // of our period.
	    var equidistant = !(relation % 0.5) && relation % 1;
	
	    // If we're equidistant, then we add a period to
	    // ensure that we always pick the value in front
	    var mod = equidistant ? period : 0;
	
	    // Adjust our value by an amount given by the closest #
	    // of periods contained in the distance between the point
	    // and the value
	    return mod + (value - period * Math.round(relation));
	  }
	
	  var nearest_periodic_value = nearestPeriodicValue;
	
	  return nearest_periodic_value;
	});
	//# sourceMappingURL=./nearest-periodic-value.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bizniz.js.map