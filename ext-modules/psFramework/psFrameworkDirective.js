"use strict";

angular.module("psFramework").directive("psFramework", function(){

	return {



		transclude:true,

		scope:{

			title: '@',
			subtitle: '@',
			iconFile: '@'

		},

		controller:"psFrameWorkController",

		templateUrl:"ext-modules/psFramework/psFrameworkTemplate.html"
	}
})