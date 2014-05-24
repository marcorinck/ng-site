// Karma configuration
// Generated on Mon Oct 14 2013 12:27:12 GMT+0200 (Mitteleuropäische Sommerzeit)

/*global process: true, module: true */
module.exports = function (config) {
	"use strict";

	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',


		// frameworks to use
		frameworks: ['jasmine', 'requirejs'],


		// list of files / patterns to load in the browser
		files: [
			{pattern: 'test/external-libs/angular-mocks.js', included: false},
			{pattern: 'app/**/*', included: false},
			{pattern: 'test/unit/**/*.js', included: false},
//			'app/**/*.html',
			'test/main-test.js'
		],


		// list of files to exclude
		exclude: [

		],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: (function () {
			if (process.platform === "win32" || process.platform === "darwin") {
				return ['dots'];
			}

			return ['dots', 'junit', 'coverage'];
		}()),


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: (function () {
			return process.platform === "win32" || process.platform === "darwin";
		}()),

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: (function () {
			if (process.platform === "win32" || process.platform === "darwin") {
				return ['Chrome'];
			}

			return ["PhantomJS"];
		}()),


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: (function () {
			return process.platform !== "win32" && process.platform !== "darwin";
		}()),

//		preprocessors: {
//			'app/**/*.html': ['ng-html2js']
//		},
//		ngHtml2JsPreprocessor: {
//		},
		coverageReporter: (function () {
			if (process.platform === "win32" || process.platform === "darwin") {
				return {};
			}

			return  {
				type: 'cobertura',
				dir: 'coverage/',
				file: 'coverage.xml'
			};
		}())
	});
};
