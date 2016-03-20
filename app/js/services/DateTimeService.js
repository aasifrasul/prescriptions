(function() {

	'use strict';

	function DateTimeService($filter, $window) {
		var factory = {};
		var currDate = new Date();
		var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var months = ["January", "February", "March", "April", "May", "June", "Juy", "August", "September", "October", "November", "December"];

		factory.getWeekDay = function(date) {
			if (!date) date = currDate;
			return weekdays[date.getDay()];
		};

		factory.getMonthText = function(date) {
			if (!date) date = currDate;
			return months[date.getMonth()];
		};

		factory.getAmPmText = function(date) {
			if (!date) date = currDate;
			return date.getHours() > 11 ? 'pm' : 'am';
		};

		factory.getFormattedMins = function(date) {
			if (!date) date = currDate;
			var mins = '' + date.getMinutes();
			return (mins.length == 1) ? '0' + mins : mins;
		}

		factory.getHours12Format = function(date) {
			if (!date) date = currDate;
			var hours = date.getHours();
			hours = hours > 12 ? hours - 12 : hours;
			return hours || 12;
		};

		factory.getDayWithPostscript = function(date) {
			if (!date) date = currDate;
			var day = date.getDate();
			var text = '';

			switch (day) {
				case 1:
				case 21:
				case 31:
					text = 'st';
					break;
				case 2:
				case 22:
					text = 'nd';
					break;
				case 3:
				case 23:
					text = 'rd';
					break;

				default:
					text = 'th';
			}
			return day + text;
		};

		return factory;
	}

	presApp.service('DateTimeService', DateTimeService);

})();