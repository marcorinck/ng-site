/*global module: true */
module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> */'
		},
		clean: {
			all: ['<%=pkg.folders.build %>'],
			css: {
				src: ['<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/*.css',
					'!<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/mareon.css']
			}
		},
		jshint: {
			src: '<%=pkg.folders.jsSource %>' + '**/*.js',
			grunt: ['gruntfile.js'],
			options: {
				jshintrc: true
			}
		},
		watch: {
			javascript: {
				files: ['<%=pkg.folders.jsSource %>' + '**/*.js'],
				tasks: ['jshint', 'karma:development:run'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['<%=pkg.folders.wwwRoot %>' + '**/*.html'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['<%=pkg.folders.wwwRoot %>' + 'css/*'],
				options: {
					livereload: true
				}
			},
			images: {
				files: ['<%=pkg.folders.wwwRoot %>' + 'images/*'],
				options: {
					livereload: true
				}
			},
			karma: {
				files: ['<%=pkg.folders.testRoot %>' + '**/*.js'],
				tasks: ['jshint', 'karma:development:run']
			}
		},
		targethtml: {
			build: {
				options: {
					curlyTags: {
						etracker: "<%= etrackerCodeSnippet %>"
					}
				},
				files: {
					'<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/': '<%=pkg.folders.wwwRoot %>*.html'
				}
			}
		},
		copy: {
			css: {
				files: [{
						expand: true,
						dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/',
						src: ['*.css'],
						cwd: '<%= pkg.folders.wwwRoot%>css/'
				}]
			},
			images: {
				files: [{
						expand: true,
						dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/images/build/',
						src: ['**'],
						cwd: '<%= pkg.folders.wwwRoot%>images/build/'
				}]
			},
			fonts: {
				files: [{
						expand: true,
						dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/fonts/',
						src: ['**'],
						cwd: '<%= pkg.folders.wwwRoot%>fonts/'
				}]
			},
			deploy: {
				files: [{
						expand: true,
						dest: '<%=deployOrdner %>',
						src: ['<%= pkg.name + "-" + pkg.version + ".tar.gz"%>'],
						cwd: '<%= pkg.folders.build%>'
				}]
			},
			htaccess: {
				files: [{
						expand: true,
						dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/',
						src: ['.htaccess'],
						cwd: '<%= pkg.folders.wwwRoot%>'
				}]
			},
			translations: {
				files: [{
					expand: true,
					dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/translations/',
					src: ['**'],
					cwd: '<%= pkg.folders.wwwRoot%>translations/'
				}]
			}
		},
		cssmin: {
			css: {
				files: {
					'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/mareon.css': [
						'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/bootstrap.css',
						'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/bootstrap-theme.css',
						'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/font-awesome.css',
						'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/extend.css'
					]
				}
			}
		},
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			development: {
				options: {
					background: true
				}
			},
			build: {
				options: {
					singleRun: true
				}
			}
		},
		compress: {
			tgz: {
				options: {
					mode: "tgz",
					archive: "<%= pkg.folders.build + pkg.name + '-' + pkg.version + '.tar.gz'%>"
				},
				expand: true,
				src: ['**/*', '**/.*'],
				dest: '<%= pkg.name + "-" + pkg.version %>/',
				cwd: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/'
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "<%= pkg.folders.jsSource %>",
					name: "../external-libs/almond",
					include: "main",
					mainConfigFile: "<%= pkg.folders.jsSource %>/main.js",
					out: "<%= pkg.folders.build + pkg.name + '-' + pkg.version %>/modules/main.js",
					//logLevel: 0,
					optimize: "uglify2",
					paths: {
						'angular': '../external-libs/min/angular',
						'jquery': '../external-libs/min/jquery',
						'config/config': "config/<%=configDatei%>"
					},
					generateSourceMaps: true,
					preserveLicenseComments: false,
					useSourceUrl: false,
					uglify2: {
						//deaktiviert das Umschreiben von Variablen-Namen ($http -> a)
						// weil der Optimizer auch die oben eingebundenen, bereits minimierten Versionen von z.B.
						// angularJS noch einmal minimiert und dadurch die angularJS Dependeny Injection kaputt geht.
						// Wenn man das doppelte Minimieren ausschalten könnte, könnte man mangle wieder auf true lassen
						// und die resultierende JS-Datei nochmal um ~20kb kleiner machen
						mangle: false
					}
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: '',
					hostname: '*',
					middleware: function (connect, options) {
						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						// Setup the proxy
						var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

						// Serve static files.
						options.base.forEach(function(base) {
							middlewares.push(connect.static(base));
						});

						// Make directory browse-able.
						var directory = options.directory || options.base[options.base.length - 1];
						middlewares.push(connect.directory(directory));

						return middlewares;
					}
				},
				proxies: [
					{
						context: ['/remote/versicherung'],
						//host: 'mnzpc0292.ad.aareon.com',  // wenn über das WLAN zugegriffen wird, hier den Rechnernamen eintragen ,
															// Mareon-Server-Projekt muss dann aber mit Maven-Property
															// system.mobileapp-hostname = Rechnername (mnzpc....) gebaut worden sein
						host: 'localhost',
						port: 8080
					}
				]
			}
		},
		manifest: {
			generate: {
				options: {
					basePath: "<%=pkg.folders.build + pkg.name + '-' + pkg.version%>",
					network: ["*"],
					fallback: [],
					exclude: [],
					preferOnline: false,
					timestamp: true
				},

				src: ["**/*", "!modules/main.js.map", "!modules/main.js.src",
					//TODO - Ordner manuell aus Liste rausfiltern, so umformulieren, dass automatisch alle Ordner rausfallen
					"!modules", "!css", "!fonts", "!images", "!images/build"],
				dest: "<%= pkg.folders.build + pkg.name + '-' + pkg.version%>/versicherungsanbindung-saga.manifest"
			}
		},
		license: {
			options: {
				unknown: false,
				start: '.',
				depth: null,
				format: "csv"
			}
		},
		dataUri: {
			dist: {
				src: ['<%=pkg.folders.wwwRoot %>css/*.css'],
				dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/',
				options: {
					target: ['<%=pkg.folders.wwwRoot %>images/*.*'],
					fixDirLevel: true,
					baseDir: '<%=pkg.folders.wwwRoot %>css'
				}
			}
		}
	});

	grunt.registerTask("install", "Erstellt Build-Artefakt im Build-Ordner für die angegebene Umgebung (QS, Prod, etc.), wenn keine Umgebung angegeben wird, wird die Default-Umgebung aus dem Source-Code verwendet",
		function (systemUmgebung) {
			grunt.task.run("jshint");
			grunt.task.run("clean:all");

			if (systemUmgebung) {
				grunt.config("configDatei", "config_" + systemUmgebung);
			} else {
				grunt.config("configDatei", "config");
			}

			if (systemUmgebung === 'prod' || systemUmgebung === 'qs') {
				grunt.config('etrackerCodeSnippet', '<script type="text/javascript" src="https://code.etracker.com/t.js?et=v8KJ23"></script><script type="text/javascript">var et_pagename="Versicherungsanbindung SAGA";var et_areas="Versicherungsanbindung SAGA - ' + systemUmgebung + '";_etc();</script>');
			} else {
				grunt.config('etrackerCodeSnippet', '');
			}

			grunt.task.run("requirejs");
			grunt.task.run("dataUri");
			grunt.task.run("cssmin");
			grunt.task.run("clean:css");
			grunt.task.run("copy:images");
			grunt.task.run("copy:fonts");
			grunt.task.run("copy:translations");
			grunt.task.run("copy:htaccess");
			grunt.task.run("targethtml:build");
			grunt.task.run("manifest");
			grunt.task.run("compress");
		}
	);

	grunt.registerTask("deploy", "Erstellt Build-Artefakt und kopiert es in den konfigurierten Deployment-Ordner für die angegebene Umgebung (QS, Prod, etc.), wenn keine Umgebung angegeben wird, wird die Default-Umgebung aus dem Source-Code verwendet",
		function (systemUmgebung) {
			var deployFolder;
			if (systemUmgebung) {
				grunt.task.run("install:" + systemUmgebung);
			} else {
				grunt.task.run("install");
			}

			if (systemUmgebung) {
				deployFolder = grunt.config("pkg.folders.deploy") + systemUmgebung + "/";
			} else {
				deployFolder = grunt.config("pkg.folders.deploy") + "/";
			}

			grunt.config("deployOrdner", deployFolder);
			grunt.file.write(deployFolder + "letzte-gebaute-version.txt", grunt.config("pkg.version"));
			grunt.task.run("copy:deploy");
		}
	);

	grunt.registerTask("release", "Führt ein Release durch: Erhöht die angegebene Versionsnummer in der package.json-Datei",
		function (versionNumber) {
			var pkg, versions;
			if (!versionNumber) {
				grunt.fatal("Die Angabe welche Versionsnummer erhöht werden soll, ist zwingend notwendig ('Major', 'Release' oder 'Hotfix')");
			}

			if (versionNumber !== 'Major' && versionNumber !== 'Release' && versionNumber !== 'Hotfix') {
				grunt.fatal("Die zu erhöhende Versionsnummer muss 'Major', 'Release' oder 'Hotfix' sein: " + versionNumber);
			}

			pkg = grunt.file.readJSON('./package.json');
			grunt.log.writeln("Bisherige Version: " + pkg.version);

			versions = pkg.version.split(".");

			if (versionNumber === 'Major') {
				versions[0] = parseInt(versions[0], 10) + 1;
				versions[1] = 0;
				versions[2] = 0;
			} else if (versionNumber === 'Release') {
				versions[1] = parseInt(versions[1], 10) + 1;
				versions[2] = 0;
			} else if (versionNumber === 'Hotfix') {
				versions[2] = parseInt(versions[2], 10) + 1;
			}

			pkg.version = versions.join(".");

			grunt.log.writeln("Neue Version: " + pkg.version);
			grunt.file.write('./package.json', JSON.stringify(pkg, undefined, '\t'));
			grunt.log.writeln("");
			grunt.log.writeln("package.json wurde erfolgreich aktualisiert.");
			grunt.log.writeln("");
			grunt.log.writeln("Achtung: Bitte die geänderte package.json-Datei manuell in Subversion einchecken");

		}
	);

	grunt.registerTask('license', 'Erstellt die Datei LICENSES mit einer Liste aller im Projekt verwendeten NPM-Module und deren Lizenz und Homepage (falls bekannt), standardmässig im CSV-Format', function () {
		function convertToCsv(data) {
			var ret = "", module, licenses, repository;

			for (module in data) {
				if (data.hasOwnProperty(module)) {
					licenses = data[module].licenses || "";
					repository = data[module].repository || "";
					ret = ret + module + ";" + licenses + ";" + repository + "\r\n";
				}
			}

			return ret;
		}

		var checker = require('license-checker'),
			fs = require('fs'),
			done = this.async(),
			defaults = {
				start: '.',
				unknown: false,
				depth: 1,
				include: 'all',
				output: 'LICENSES',
				format: 'json' //json or csv
			},
			options = grunt.util._.extend(defaults, this.options());

		checker.init(options, function (data) {
			if (options.output) {
				if (options.format === 'csv') {
					data = convertToCsv(data);
				} else {
					data = JSON.stringify(data, null, 4);
				}

				fs.writeFile(options.output, data, function () {
					console.log('Successfully written '.green + options.output.grey);
					done();
				});
			}
		});
	});

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('web', ['connect:server', 'configureProxies:server', 'karma:development', 'watch']); //'configureProxies:server',

	//für alle grunt-* Plugins in der package.json grunt.loadNpmTasks aufrufen
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};