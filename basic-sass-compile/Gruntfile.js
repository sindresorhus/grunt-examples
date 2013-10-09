'use strict';
// wrapper function that exposes the grunt instance
module.exports = function (grunt) {
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// initialize the configuration object
	grunt.initConfig({
		// https://github.com/gruntjs/grunt-contrib-sass
		sass: {
			dist: {
				// you can also specify the files dynamically so you don't have to specify every
				// file manually. Also useful to preserve the existing folder structure
				// https://github.com/gruntjs/grunt/wiki/Configuring-tasks#building-the-files-object-dynamically
				files: [{
					// this is the sass output style
					expand: true,
					// now load all .scss files from the compile directory
					src: ['sass/*.sass'],
					// after compiling the .scss files, places them into the css directory
					dest: 'css',
					// give the compiled files the .css file extension
					ext: '.css'
				}]
			}
		}
	});

	// we register the default task which is run when you run `grunt`.
	// by setting default you can have multiple task run as the default grunt command.
	// you can also run 'grunt sass' to access the individual sass task.
	grunt.registerTask('default', ['sass']);
};
