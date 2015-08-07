"use strict";

angular.module("psMenu").directive('psMenu', [function () {
	
	return {

		restrict: 'EA',

		transclude:true,

		templateUrl:"ext-modules/psMenu/psMenuTemplate.html",

		controller: "psMenuController",

		scope:{},

		link: function (scope, iElement, iAttrs) {
			
		}
	};
}])