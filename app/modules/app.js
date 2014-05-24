define(['angular', 'config/config', 'angular.bootstrap'],
	function (angular, config) {
		'use strict';
		var app, modules = [ 'config', 'ngRoute', 'ui.bootstrap'];

		app = angular.module('ng-site', modules);

		app.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/'});
		}]);

		return app;
	}
);