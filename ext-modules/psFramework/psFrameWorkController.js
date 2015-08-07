"use strict";

angular.module("psFramework").controller("psFrameWorkController", ["$scope","$window","$timeout","$rootScope",
	function($scope, $window,$timeout,$rootScope){

	
	$scope.isMenuVisible = true;
	$scope.isMenuButtonVisible = true;


	$scope.$on("ps-menu-item-selected-event", function(event, data){

			$scope.routeString = data.route;

			checkWidth();
			broadcastMenuState();

			console.log($scope.routeString);
	});


	//rezise is the window event
	//jQuery provides the namespacing after event name
	$($window).on("resize.psFramework", function(){

		$scope.$apply(function(){

			checkWidth();
			broadcastMenuState();
		});
	});

	$scope.menuButtonClicked = function(){

		$scope.isMenuVisible = !$scope.isMenuVisible;
		broadcastMenuState();
		$scope.$apply();

	}

	var broadcastMenuState = function(){

		$rootScope.$broadcast("ps-menu-show",{
			show:$scope.isMenuVisible
		})
	}



	$scope.$on("$destroy", function(){

		$($window).off("resize.psFramework");
	});



	var checkWidth = function(){

		var width = Math.max($($window).width(),$window.innerWidth);

		$scope.isMenuVisible = (width >= 768);

		$scope.isMenuButtonVisible = !$scope.isMenuVisible;
	}

	$timeout(function(){

		checkWidth();

	},0)
	
}])