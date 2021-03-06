/*

    All node modules are contained in source control.

    Additional dependencies:

    sass:
    - ruby
    - sass gem -> "gem install sass"

    TODO: 

    - main and media-queries to scss; compile to main.css
    - components folder (use for carousel)

*/

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                
            },
            build: {
                src: [
                '_assets/js/*.js',
                '!_assets/js/app.min.js',
                '!_assets/js/app.concat.js'
                ],
                dest: '_assets/js/app.concat.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n'
            },
            build: {
                src: [
                '_assets/js/*.js',
                '!_assets/js/app.min.js',
                '!_assets/js/app.concat.js'
                ],
                dest: '_assets/js/app.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    debugInfo: false,
                    lineNumbers: true
                },
                files: {
                    '_assets/css/main.css': '_assets/css/sass/main.scss'
                }
            }
        },        
        watch: {
            js: {
                files: ['_assets/js/*.js', '!_assets/js/app.concat.js', '!_assets/js/app.min.js'],
                tasks: ['concat', 'uglify']
            },
            sass: {
                files: ['_assets/css/**/**/*.scss'],
                tasks: ['sass']
            }
        }
    });
    
    // NPM tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Grunt tasks
    grunt.registerTask('default', ['uglify', 'sass', 'concat']);

};