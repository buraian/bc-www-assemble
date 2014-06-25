/*
 * Generated on 2014-04-07
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    /**
     * Metadata for templates.
     */
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('src/data/site.yml'),

    /**
     * Aliases.
     */
    config: {
      src: 'src',
      dist: 'dist',
      bower: 'bower_components',
      domain: 'brian-clark.com'
    },

    /**
     * Grunt Watch.
     */
    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,**/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      compass: {
        files: ['<%= config.src %>/sass/{,**/}*.scss'],
        tasks: ['compass', 'newer:autoprefixer', 'newer:cssmin']
      },
      csslint: {
        files: ['<%= config.dist %>/assets/css/style.css'],
        tasks: ['newer:csslint']
      },
      grunt: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      uglify: {
        files: ['<%= config.dist %>/assets/js/script.js'],
        tasks: ['newer:uglify']
      }
    },

    /**
     * Grunt Server.
     */
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    /**
     * Generate the site.
     */
    assemble: {
      options: {
        assets: '<%= config.dist %>/assets',
        data: '<%= config.src %>/data/*.{json,yml}',
        flatten: true,
        helpers: ['helper-moment', 'helper-prettify'],
        layout: 'default.hbs',
        layoutdir: '<%= config.src %>/templates/layouts/',
        partials: '<%= config.src %>/templates/partials/**/*.hbs'
        // prettify: {
        //   indent: 2,
        //   condense: true,
        //   padcomments: true
        // }
      },

      /**
       * Site root pages.
       */
      root: {
        options: {
          layout: 'mobile-stack.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/pages',
            src: ['**/*.hbs'],
            dest: '<%= config.dist %>/'
          }
        ]
      },

      /**
       * "Portfolio" section.
       */
      portfolio: {
        options: {
          layout: 'portfolio-article.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/pages',
            src: ['portfolio.hbs'],
            dest: '<%= config.dist %>/'
          },
          {
            expand: true,
            cwd: '<%= config.src %>/pages/portfolio',
            src: ['*.hbs'],
            dest: '<%= config.dist %>/portfolio/',
            ext: '.html'
          }
        ]
      }
    },

    /**
     * Copy Bower Components to destinations
     */
    copy: {
      entypo: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/entypo/font',
            src: '**/*.{eot,svg,ttf,woff}',
            dest: '<%= config.dist %>/assets/fonts/'
          }
        ]
      },
      fastclick: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/fastclick/lib',
            src: '**/*.js',
            dest: '<%= config.dist %>/assets/js/vendor/fastclick/'
          }
        ]
      },
      ionicons: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/ionicons/fonts',
            src: '**/*.{eot,svg,ttf,woff}',
            dest: '<%= config.dist %>/assets/fonts/'
          }
        ]
      },
      isotope: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/isotope/dist',
            src: 'isotope.pkgd.min.js',
            dest: '<%= config.dist %>/assets/js/vendor/isotope/'
          }
        ]
      },
      jquery: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/jquery/dist',
            src: '**/*.js',
            dest: '<%= config.dist %>/assets/js/vendor/jquery/'
          }
        ]
      },
      jquerybbq: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/jquery.bbq',
            src: 'jquery.ba-bbq.min.js',
            dest: '<%= config.dist %>/assets/js/vendor/jquery.bbq/'
          }
        ]
      },
      jqueryui: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/jquery.ui/ui',
            src: 'jquery.ui.core.js',
            dest: '<%= config.dist %>/assets/js/vendor/jquery.ui/'
          },
          {
            expand: true,
            cwd: '<%= config.bower %>/jquery.ui/ui',
            src: 'jquery.ui.widget.js',
            dest: '<%= config.dist %>/assets/js/vendor/jquery.ui/'
          },
          {
            expand: true,
            cwd: '<%= config.bower %>/jquery.ui/ui',
            src: 'jquery.ui.tabs.js',
            dest: '<%= config.dist %>/assets/js/vendor/jquery.ui/'
          }
        ]
      },

      modernizr: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/modernizr',
            src: 'modernizr.js',
            dest: '<%= config.dist %>/assets/js/vendor/modernizr/'
          }
        ]
      },
      nivolightbox: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/nivo-lightbox',
            src: '*.js',
            dest: '<%= config.dist %>/assets/js/vendor/nivo-lightbox/'
          },
          {
            expand: true,
            cwd: '<%= config.bower %>/nivo-lightbox',
            src: '*.css',
            dest: '<%= config.dist %>/assets/css/vendor/nivo-lightbox/'
          },
          {
            expand: true,
            cwd: '<%= config.bower %>/nivo-lightbox',
            src: 'themes/**',
            dest: '<%= config.dist %>/assets/css/vendor/nivo-lightbox/'
          }
        ]
      },
      normalizecss: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/normalize-css',
            src: 'normalize.css',
            dest: '<%= config.dist %>/assets/css/vendor/normalize/'
          }
        ]
      },
      perfectscrollbar: {
        files: [
          {
            expand: true,
            cwd: '<%= config.bower %>/perfect-scrollbar/min',
            src: 'perfect-scrollbar-0.4.10.min.css',
            dest: '<%= config.dist %>/assets/css/vendor/perfect-scrollbar/'
          },
          {
            expand: true,
            cwd: '<%= config.bower %>/perfect-scrollbar/min',
            src: 'perfect-scrollbar-0.4.10.with-mousewheel.min.js',
            dest: '<%= config.dist %>/assets/js/vendor/perfect-scrollbar/'
          }
        ]
      }
    },

    /**
     * Compile SASS to CSS using Compass
     */
    compass: {
      dist: {
        options: {
          sassDir: '<%= config.src %>/sass',
          cssDir: '<%= config.dist %>/assets/css',
          imagesDir: '<%= config.dist %>/assets/images',
          generatedImagesDir: '<%= config.dist %>/assets/images/generated',
          javascriptsDir: '<%= config.dist %>/assets/js',
          fontsDir: '<%= config.dist %>/assets/fonts',
          environment: 'development',
          outputStyle: 'expanded',
          require: ['breakpoint']
        }
      }
    },

    /**
     * Run author compiled CSS files through prefixer service
     */
    autoprefixer: {
      options: {
        browsers: ['Explorer >= 7', 'Android >= 2', 'iOS >= 5', 'Firefox >= 4', '> 1%']
      },
      dist: {
        src: ['<%= config.dist %>/assets/css/style.css']
      }
    },

    /**
     * Lint author compiled CSS
     */
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['<%= config.dist %>/assets/css/style.css']
    },

    /**
     * Minify all CSS files
     */
    cssmin: {
      dist_compressed: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dist %>/assets/css/',
            src: ['**/*.css', '!**/*.min.css'],
            dest: '<%= config.dist %>/assets/css/',
            ext: '.min.css',
            flatten: false
          }
        ]
      }
    },

    /**
     * Minify all JS files
     */
    uglify: {
      files: {
        expand: true,
        cwd: '<%= config.dist %>/assets/js/',
        src: ['**/*.js', '!**/*.min.js'],
        dest: '<%= config.dist %>/assets/js/',
        ext: '.min.js',
        flatten: false
      }
    },

    /**
     * Generate multiple images sizes
     */
    responsive_images: {

      /**
       * Process full-size images:
       * => @2x to @2x
       * => @2x to @1x
       */
      pony: {
        options: {
          sizes: [
            {
              name: '2x',
              width: '100%'
            },
            {
              name: '1x',
              width: '50%'
            }
          ],
          separator: '@'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/files/portfolio/',
            src: ['*/2x/*.{jpg,gif,png}'],
            dest: '<%= config.dist %>/assets/files/portfolio/full/',
            flatten: true,
            extdot: 'last'
          }
        ]
      },

      /**
       * => @1x to @1x
       */
      johnny: {
        options: {
          sizes: [
            {
              name: '1x',
              width: '100%'
            }
          ],
          separator: '@'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/files/portfolio/',
            src: ['*/1x/*.{jpg,gif,png}'],
            dest: '<%= config.dist %>/assets/files/portfolio/full/',
            flatten: true,
            extdot: 'last'
          }
        ]
      },

      /**
       * Process thumbnail images:
       * => @1x+ to @2x
       */
      dallas: {
        options: {
          sizes: [
            {
              name: '2x',
              width: 410,
              height: 410,
              aspectRatio: false,
              gravity: 'North'
            }
          ],
          separator: '@'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/files/portfolio/',
            src: ['*/1x/*.{jpg,gif,png}'],
            dest: '<%= config.dist %>/assets/files/portfolio/thumbnail/',
            flatten: true,
            extdot: 'last'
          }
        ]
      },

      /**
      * => @2x+ to @2x
      */
      cherry: {
        options: {
          sizes: [
            {
              name: '2x',
              width: 410,
              height: 410,
              aspectRatio: false,
              gravity: 'North'
            }
          ],
          separator: '@'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.src %>/files/portfolio/',
            src: ['*/2x/*.{jpg,gif,png}'],
            dest: '<%= config.dist %>/assets/files/portfolio/thumbnail/',
            flatten: true,
            extdot: 'last'
          }
        ]
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble'); // ~0.4.0
  // grunt.loadNpmTasks('grunt-assemble'); // ~0.5.0
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-responsive-images');

  grunt.registerTask('default', [
    'server'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble'
  ]);

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'newer:copy',
    'compass',
    'newer:autoprefixer',
    'newer:csslint',
    'newer:cssmin',
    'newer:uglify',
    'connect:livereload',
    'watch'
  ]);
};
