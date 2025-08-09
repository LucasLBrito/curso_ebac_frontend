

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            developement: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                },
                production: {
                    options: {
                        compress: true,
                    },
                    files: {
                        'dist/styles/main.lessmain.css': 'src/styles/main.less'
                }
        }
                }
            },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:developement']
            }}
        },)

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production']);

    }