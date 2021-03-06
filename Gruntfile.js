'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      files: ['dist']
    },
    qunit: {
      files: ['test/unit/**/*.html']
    },
    jshint: {
      src: ['src/**/*.js']
    },
    sass: {
      options: {
        cacheLocation: 'build/.sass-cache',
        loadPath: [
          'components/lat-mixins/dist/styles',
          'src/styles'
        ]
      },
      dev: {
        src: ['src/styles/main.scss'],
        dest: 'test/styles/bootstrap.css'
      },
      dist: {
        options: {
          style: 'compact'
        },
        src: ['src/styles/main.scss'],
        dest: 'dist/bootstrap.css'
      }
    },
    watch: {
      sass: {
        files: [
          'components/lat-mixins/dist/styles/*.scss',
          'src/styles/*.scss'
        ],
        tasks: ['sass:dev', 'imageEmbed:dev'],
      }
    },
    imageEmbed: {
      dev: {
        src: [ 'test/styles/bootstrap.css' ],
        dest: 'test/styles/bootstrap.css',
        options: {
          deleteAfterEncoding : false,
          baseDir: 'src/images'
        }
      },
      dist: {
        src: [ 'dist/bootstrap.css' ],
        dest: 'dist/bootstrap.css',
        options: {
          deleteAfterEncoding : false,
          baseDir: 'src/images'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          // optimize: 'none',
          name: 'config',
          mainConfigFile: 'src/config.js',
          out: 'dist/bootstrap.js',
          almond: true,  //Wrap as stand alone lib (so require not needed by consumer of this lib)
          wrap: true     //Wraps in an anoymous scope (used w/ almond)
        }
      }
    },
    connect: {
      development: {
        options: {
          keepalive: false,
        }
      },
      production: {
        options: {
          keepalive: true,
          port: 8000,
          middleware: function(connect, options) {
            return [
              // rewrite requirejs to the compiled version
              function(req, res, next) {
                if (req.url === '/components/requirejs/require.js') {
                  req.url = '/dist/require.min.js';
                }
                next();
              },
              connect.static(options.base),

            ];
          }
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks("grunt-image-embed");

  // Default task.
  grunt.registerTask('default', ['build']);
  grunt.registerTask('unit', ['jshint', 'sass:dev', 'imageEmbed:dev', 'qunit']);
  grunt.registerTask('build', ['unit', 'clean', 'sass:dist', 'imageEmbed:dist', 'requirejs']);
  grunt.registerTask('server', ['sass:dev', 'imageEmbed:dev', 'connect:development', 'watch:sass']);
  grunt.registerTask('preview', ['default', 'connect:production']);

};
