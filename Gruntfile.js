/*
 * Grunt Script for Bootstrap less
 * http://gruntjs.com/
 */

"use strict";
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    less: {
      bootstrap: {
        // options: {
        //   strictMath: true,
        //   sourceMap: true,
        //   outputSourceFiles: true,
        //   sourceMapURL: "<%= pkg.name %>.css.map",
        //   sourceMapFilename: "<%= pkg.frontEndBuildDirectory %>/css/<%= pkg.name %>.css.map"
        // },
        src: "<%= pkg.nodeModulesDirectory %>/bootstrap/less/bootstrap.less",
        dest: "<%= pkg.frontEndBuildDirectory %>/css/bootstrap.css"
      },

      samscustom: {
        files: [{
          src: "<%= pkg.frontEndDevDirectory %>/styles/core/core.less",
          dest: "<%= pkg.frontEndBuildDirectory %>/css/core/core.css"
        },

        {
          expand: true,     // Enable dynamic expansion.
          cwd: "<%= pkg.frontEndDevDirectory %>/styles/",      // Src matches are relative to this path.
          src: ["**/*.less", "!core/*.less"], // Actual pattern(s) to match.
          dest: "<%= pkg.frontEndBuildDirectory %>/css/",   // Destination path prefix.
          ext: ".css"   // Dest filepaths will have this extension.
        }]
      },
    },


    watch: {
      samscustom: {
        files: ["<%= pkg.frontEndDevDirectory %>/**/*.*"],
        tasks: ["build"],
        options: {
          debounceDelay: 250
        }
      }
    },


    clean: {
      build: [
        "<%= pkg.frontEndBuildDirectory %>/**/*.css",
        "<%= pkg.frontEndBuildDirectory %>/**/*.js",
        "<%= pkg.frontEndBuildDirectory %>/**/*.hbs"
      ]
    },


    autoprefixer: {
      options: {
        browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24", // Firefox 24 is the latest ESR
          "Explorer >= 8",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6"
        ],
        map: true
      },

      bootstrap: {
        src: "<%= pkg.frontEndBuildDirectory %>/css/bootstrap.css"
      },

      samscustom: {
        files: [{
          expand: true,
          cwd: "<%= pkg.frontEndBuildDirectory %>/css/",
          src: ["*/**/*.css"],
          dest: "<%= pkg.frontEndBuildDirectory %>/css/",
          ext: ".css"
        }]
      }
    },


    cssmin: {
      bootstrap: {
        files: {
          "<%= pkg.frontEndBuildDirectory %>/css/bootstrap.min.css":
            ["<%= pkg.frontEndBuildDirectory %>/css/bootstrap.css"]
        }
      },

      samscustom: {
        files: [{
          expand: true,
          cwd: "<%= pkg.frontEndBuildDirectory %>/css/",
          src: ["*/**/*.css"],
          dest: "<%= pkg.frontEndBuildDirectory %>/css/",
          ext: ".min.css"
        }]
      }
    },


    copy: {
      samscustom: {
        files: [{
          expand: true,
          cwd: "<%= pkg.frontEndDevDirectory %>/common_components/",
          src: ["**/*"],
          dest: "<%= pkg.frontEndBuildDirectory %>/common_components/"
        },

        {
          expand: true,
          cwd: "<%= pkg.frontEndDevDirectory %>/scripts/",
          src: ["**/*.js"],
          dest: "<%= pkg.frontEndBuildDirectory %>/js/",
          ext: ".js"
        },

        {
          expand: true,
          cwd: "<%= pkg.frontEndDevDirectory %>/templates/",
          src: ["**/*.html"],
          dest: "<%= pkg.frontEndBuildDirectory %>/html/",
          ext: ".html"
        }]
      }
    },


    concat: {
      bootstrap: {
        files: {
          "<%= pkg.frontEndBuildDirectory %>/js/bootstrap.js":
            "<%= pkg.nodeModulesDirectory %>/bootstrap/js/*.js"
        }
      }
    },


    uglify: {
      bootstrap: {
        files: {
          "<%= pkg.frontEndBuildDirectory %>/js/bootstrap.min.js":
            "<%= pkg.frontEndBuildDirectory %>/js/bootstrap.js"
        }
      },

      samscustom: {
        files: [{
          expand: true,
          cwd: "<%= pkg.frontEndBuildDirectory %>/common_components",
          src: ["**/*.js"],
          dest: "<%= pkg.frontEndBuildDirectory %>/common_components/",
          ext: ".min.js"
        },

        {
          expand: true,
          cwd: "<%= pkg.frontEndBuildDirectory %>/js/",
          src: ["*/**/*.js"],
          dest: "<%= pkg.frontEndBuildDirectory %>/js/",
          ext: ".min.js"
        }]
      }
    }
  });

  // Load plugins here
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-concat');

  // grunt.registerTask("bootstrap", ["clean", "less:bootstrap", "autoprefixer:bootstrap", "cssmin:bootstrap"]);
  // grunt.registerTask("samscustom", ["clean", "less:samscustom", "autoprefixer:samscustom", "cssmin:samscustom"]);
  grunt.registerTask("build", ["clean", "less", "autoprefixer" ,"cssmin", "copy", "concat", "uglify"]);
};
