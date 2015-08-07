"use strict";

angular.module("psMenu").controller('psMenuController', ['$scope', '$rootScope',
	function ($scope, $rootScope) {

		$scope.showMenu = true;

		this.getActiveItem = function(){

			return $scope.activeElement;
		}
	
		this.setActiveItem =  function(el){

				$scope.activeElement = el;
		}

		this.setRoute = function(route){

			$rootScope.$broadcast("ps-menu-item-selected-event", {

				route: route
			});
		}

		$scope.$on('ps-menu-show', function(event, data){

			$scope.showMenu = data.show;
		})
}]);