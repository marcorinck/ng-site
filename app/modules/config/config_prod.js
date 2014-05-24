define(['angular', 'config/constants'], function (angular, constants) {
	"use strict";

	var config = {
			useMock: false

		},
		configModule = angular.module("config", []);

	configModule.value('config', config);
	configModule.constant('constants', constants);

	return config;
});