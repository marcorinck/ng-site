(function (require, window) {
	"use strict";

	require.config({
		paths:{
			'angular':'../../bower_components/angular/angular',
			'ngRoute':'../../bower_components/angular-route/angular-route',
			'jquery':'../../bower_components/jquery/dist/jquery',
			'angular.bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls'
		},
		shim:{
			'jquery': {exports: '$'},
			'angular':{ deps:['jquery'], exports:'angular' },
			'ngRoute':{ deps:['angular'] },
			'angular.bootstrap': {deps: ['angular']}
		}
	});

	function tryHoldReady() {
		if (!tryHoldReady.executed && window.jQuery) {
			window.jQuery.holdReady(true);
			tryHoldReady.executed = true;
		}
	}

	tryHoldReady();
	require.onResourceLoad = tryHoldReady;

	require([
		'jquery',
		'angular',
		'config/config',
		'ngRoute',
		'app'
	], function (jquery, angular, config) {
		jquery.holdReady(false);
	});
}(require, window));