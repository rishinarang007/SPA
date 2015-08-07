"use strict";

angular.module("psMenu").directive('psMenuItem', [function () {
	
	return {

		restrict: 'EA',	

		templateUrl:"ext-modules/psMenu/psMenuItemTemplate.html",

		require:"^psMenu",

		scope:{

			label:"@",
			icon:"@",
			route:"@"
		},

		link: function (scope, iElement, iAttrs, ctrl) {

			scope.isActive = function(){

				return iElement === ctrl.getActiveItem();
			}
			
			iElement.on("click", function(event){

					event.stopPropagation();
					event.preventDefault();

					scope.$apply(function(){

						ctrl.setActiveItem(iElement);
						ctrl.setRoute(scope.route);
					});
			});
		}
	};
}])