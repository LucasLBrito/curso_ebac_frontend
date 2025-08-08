module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            developement: {
                flies:{
                    'main.css': 'main.less'
                }
        }}
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['less']);

    }