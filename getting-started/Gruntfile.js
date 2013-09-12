'use strict';
// wrapper function that exposes the grunt instance
module.exports = function (grunt) {
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);
	// show elapsed time at the end
	require('time-grunt')(grunt);

	// initialize the configuration object
	grunt.initConfig({
		// user defined config
		config: {
			message: 'grunt grunt'
		},
		// load package.json into the grunt config
		// grunt comes bundled with a lot of useful utility functions
		pkg: grunt.file.readJSON('package.json'),
		// grunt task
		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			// task target
			jshint: {
				// we reference the jshint files with a lodash template
				files: ['<%= jshint.target.src %>'],
				// using grunt-newer so it only compiles changed files ♥
				// grunt unfortunately doesn't do this built-in
				tasks: ['newer:jshint']
			}
		},
		// https://github.com/gruntjs/grunt-contrib-jshint
		jshint: {
			target: {
				// standard options object
				options: {
					jshintrc: '.jshintrc'
				},
				// here we define the src files
				// grunt has many ways to define input/out, see docs
				files: ['**/*.js']
			}
		},
		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			target: {
				// you can also specify the files dynamically so you don't have to specify every
				// file manually. Also useful to preserve the existing folder structure
				// https://github.com/gruntjs/grunt/wiki/Configuring-tasks#building-the-files-object-dynamically
				files: [{
					expand: true,        // enable dynamic expansion
					cwd: 'scripts',      // src matches are relative to this path
					src: ['**/*.js'],    // actual patterns to match
					dest: 'dist'         // destination path prefix
				}]
			}
		},
		// easily run a shell command
		// https://github.com/sindresorhus/grunt-shell
		shell: {
			// options can also be set for all targets
			options: {
				stdout: true
			},
			version: {
				// here we use the information we loaded from package.json
				command: 'echo using version <%= pkg.version %>'
			},
			gruntgrunt: {
				command: 'echo <%= config.message %>'
			}
		}
	});

	// we register our the default task which is run when you run `grunt`
	grunt.registerTask('default', [
		// adds the `jshint` task as a parameter to the
		// `newer` task so it's only runs changed files
		// https://github.com/tschaub/grunt-newer
		'newer:jshint',
		'newer:uglify',
		'shell:version',
		'shell:gruntgrunt'
	]);
};
