module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
          build_dir: './build',
          mac: true,
          win: false,

      },
      src: ['./src/**/*']
    }    
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');

  grunt.registerTask('build', ['nodewebkit']);

};