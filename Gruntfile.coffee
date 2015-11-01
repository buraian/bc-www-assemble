#
# Generated on 2014-04-07
# generator-assemble v0.4.11
# https://github.com/assemble/generator-assemble
#
# Copyright (c) 2014 Hariadi Hinta
# Licensed under the MIT license.
#
module.exports = (grunt) ->
  "use strict"

  require("load-grunt-tasks") grunt
  require("time-grunt") grunt

  # Project configuration.
  grunt.initConfig

    # Metadata
    pkg: grunt.file.readJSON("package.json")
    site: grunt.file.readYAML("src/data/site.yml")
    banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " + "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" + "<%= pkg.homepage ? \"* \" + pkg.homepage + \"\\n\" : \"\" %>" + "* Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %> <<%= pkg.author.homepage %>>" + " */\n\n"

    # Aliases
    config:
      src: "src"
      dist: "dist"
      bower: "bower_components"
      npm: "node_modules"

    url:
      domain: "brian-clark.com"
      portfolio: "//portfolio.<%= url.domain %>"

    # Target-specific file lists and/or options go here.
    assemble:
      options:
        assets: "<%= config.dist %>/assets"
        data: "<%= config.src %>/data/*.{json,yml}"
        flatten: true
        helpers: [
          "helper-moment"
          "helper-prettify"
        ]
        layout: "default.hbs"
        layoutdir: "<%= config.src %>/templates/layouts/"
        partials: "<%= config.src %>/templates/partials/**/*.hbs"
        # prettify: {
        #   indent: 2,
        #   condense: true,
        #   padcomments: true
        # }
      # Maintenance mode
      # maintenance:
      #   options:
      #     layout: "maintenance.hbs"

      #   files: [
      #     expand: true
      #     cwd: "<%= config.src %>/content/maintenance/"
      #     src: ["**/*.hbs"]
      #     dest: "<%= config.dist %>"
      #   ]
      # Site root pages
      root:
        options:
          layout: "up.hbs"
        files: [
          expand: true
          cwd: "<%= config.src %>/content/pages"
          src: ["**/*.hbs"]
          dest: "<%= config.dist %>/"
        ]
      # "Portfolio" section.
      portfolio:
        options:
          layout: "portfolio-article.hbs"
        files: [
          expand: true
          cwd: "<%= config.src %>/content/pages"
          src: ["portfolio.hbs"]
          dest: "<%= config.dist %>/"
        ,
          expand: true
          cwd: "<%= config.src %>/content/pages/portfolio"
          src: ["*.hbs"]
          dest: "<%= config.dist %>/portfolio/"
          ext: ".html"
        ]

    autoprefixer:
      options:
        browsers: [
          "Explorer >= 7"
          "Android >= 2"
          "iOS >= 5"
          "Firefox >= 4"
          "> 1%"
        ]
      dist:
        src: ["<%= config.dist %>/assets/css/style.css"]

    clean:
      favicons: "<%= config.dist %>/*.{ico,png}"
      fonts: "<%= config.dist %>/assets/fonts/**/*"
      images: [
        "<%= config.dist %>/assets/images/**/*"
        "<%= config.dist %>/assets/files/portfolio/**/*"
      ]
      scripts: "<%= config.dist %>/assets/js/**/*"
      styles: "<%= config.dist %>/assets/css/**/*"
      templates: "<%= config.dist %>/**/*.{html,xml}"

    concat:
      options:
        banner: "<%= banner %>"
      dist:
        src: [
          "<%= config.bower %>/modernizr/modernizr.js"
          "<%= config.bower %>/fastclick/lib/fastclick.js"
          "<%= config.bower %>/jquery/dist/jquery.js"
          "<%= config.bower %>/jquery.ui/ui/jquery.ui.core.js"
          "<%= config.bower %>/jquery.ui/ui/jquery.ui.widget.js"
          "<%= config.bower %>/jquery.ui/ui/jquery.ui.tabs.js"
          "<%= config.bower %>/jquery.bbq/jquery.ba-bbq.min.js"
          "<%= config.bower %>/isotope/dist/isotope.pkgd.js"
          "<%= config.npm %>/perfect-scrollbar/dist/js/perfect-scrollbar.js"
          "<%= config.bower %>/nivo-lightbox/nivo-lightbox.js"
        ]
        dest: "<%= config.dist %>/assets/js/script.js"

    connect:
      options:
        port: 9000
        livereload: 35729
        hostname: "0.0.0.0" # change this to '0.0.0.0' to access the server from outside
      livereload:
        options:
          open: true
          base: ["<%= config.dist %>"]

    copy:
      fonts:
        # Ionicons
        files: [
          expand: true
          cwd: "<%= config.bower %>/ionicons/fonts"
          src: "**/*.{eot,svg,ttf,woff}"
          dest: "<%= config.dist %>/assets/fonts/"
        ]
      favicons:
        files: [
          expand: true
          cwd: "<%= config.src %>/files/favicons"
          src: "*"
          dest: "<%= config.dist %>/"
        ]
      other:
        # Nivo Slider Theme
        files: [
          expand: true
          cwd: "<%= config.bower %>/nivo-lightbox"
          src: "themes/**"
          dest: "<%= config.dist %>/assets/css/vendor/nivo-lightbox/"
        ]

    cssmin:
      dist_compressed:
        files: [
          expand: true
          cwd: "<%= config.dist %>/assets/css/"
          src: [
            "**/*.css"
            "!**/*.min.css"
          ]
          dest: "<%= config.dist %>/assets/css/"
          ext: ".min.css"
          extDot: "last"
          flatten: false
        ]

    imagemin:
      options:
        optimizationLevel: 3
      dist:
        files: [
          expand: true
          cwd: "<%= config.src %>/assets/images/"
          src: ["**/*.{png,jpg,gif}"]
          dest: "<%= config.dist %>/assets/images/"
        ,
          expand: true
          cwd: "<%= config.src %>/files/portfolio/"
          src: ["**/*.{png,jpg,gif}"]
          dest: "<%= config.dist %>/files/portfolio/"
        ]

    responsive_images:
      ###
      Process full-size images:
      => @2x to @2x
      => @2x to @1x
      ###
      pony:
        options:
          sizes: [
            name: "2x"
            width: "100%"
          ,
            name: "1x"
            width: "50%"
          ]
          separator: "@"
        files: [
          expand: true
          cwd: "<%= config.src %>/files/portfolio/"
          src: ["*/2x/*.{jpg,gif,png}"]
          dest: "<%= config.dist %>/assets/files/portfolio/full/"
          flatten: true
          extdot: "last"
        ]
      ###
      => @1x to @1x
      ###
      johnny:
        options:
          sizes: [
            name: "1x"
            width: "100%"
          ]
          separator: "@"
        files: [
          expand: true
          cwd: "<%= config.src %>/files/portfolio/"
          src: ["*/1x/*.{jpg,gif,png}"]
          dest: "<%= config.dist %>/assets/files/portfolio/full/"
          flatten: true
          extdot: "last"
        ]
      ###
      Process thumbnail images:
      => @1x+ to @2x
      ###
      dallas:
        options:
          sizes: [
            name: "2x"
            width: 410
            height: 410
            aspectRatio: false
            gravity: "North"
          ]
          separator: "@"
        files: [
          expand: true
          cwd: "<%= config.src %>/files/portfolio/"
          src: ["*/1x/*.{jpg,gif,png}"]
          dest: "<%= config.dist %>/assets/files/portfolio/thumbnail/"
          flatten: true
          extdot: "last"
        ]
      ###
      => @2x+ to @2x
      ###
      cherry:
        options:
          sizes: [
            name: "2x"
            width: 410
            height: 410
            aspectRatio: false
            gravity: "North"
          ]
          separator: "@"
        files: [
          expand: true
          cwd: "<%= config.src %>/files/portfolio/"
          src: ["*/2x/*.{jpg,gif,png}"]
          dest: "<%= config.dist %>/assets/files/portfolio/thumbnail/"
          flatten: true
          extdot: "last"
        ]

    sass:
      options:
        sourceMap: false
        outputStyle: "expanded"
      global:
        files: [
          expand: true
          cwd: "<%= config.src %>/sass"
          src: ["**/*.{sass,scss}"]
          dest: "<%= config.dist %>/assets/css/"
          ext: ".css"
          extDot: "last"
        ]

    svgmin:
      options:
        plugins: [
          removeViewBox: true
        ,
          removeUselessStrokeAndFill: true
        ,
          removeEmptyAttrs: true
        ]
      dist:
        files: [
          expand: true
          cwd: "<%= config.src %>/assets/images/"
          src: ["**/*.svg"]
          dest: "<%= config.dist %>/assets/images/"
          ext: ".min.svg"
        ]

    uglify:
      options:
        banner: "<%= banner %>"
      files:
        src: ["<%= config.dist %>/assets/js/script.js"]
        dest: "<%= config.dist %>/assets/js/script.min.js"

    watch:
      grunt:
        files: ["Gruntfile.coffee", "Gruntfile.js"]
        tasks: ["default"]
      images:
        files: [
          "<%= config.src %>/assets/images/**/*.{png,jpg,gif,svg}"
          "<%= config.src %>/files/**/*.{png,jpg,gif,svg}"
        ]
        tasks: ["newer:images"]
      livereload:
        options:
          livereload: "<%= connect.options.livereload %>"
        files: ["<%= config.dist %>/**/*.{html,css,js,png,jpg,jpeg,gif,webp,svg}"]
      styles:
        files: ["<%= config.src %>/sass/**/*.{sass,scss}"]
        tasks: ["styles"]
      scripts:
        files: ["<%= config.src %>/assets/js/**/*.{js,map}"]
        tasks: ["styles"]
      templates:
        files: ["<%= config.src %>/{content,data,templates}/**/*.{md,hbs,yml}"]
        tasks: ["templates"]

  grunt.loadNpmTasks "assemble"

  # Default task
  grunt.registerTask "default", [
    "build"
    "watch"
  ]

  # Build task
  grunt.registerTask "build", [
    "clean"
    "templates"
    "styles"
    "scripts"
    "assets"
    "images"
    "connect:livereload"
  ]

  # Assets
  grunt.registerTask "assets", [
    "clean:favicons"
    "clean:fonts"
    "copy:favicons"
    "copy:fonts"
    "copy:other"
  ]

  # Images
  grunt.registerTask "images", [
    "newer:responsive_images"
    "newer:imagemin"
    "newer:svgmin"
  ]

  # Scripts
  grunt.registerTask "scripts", [
    "clean:scripts"
    "concat"
    "uglify"
  ]

  # Styles
  grunt.registerTask "styles", [
    "clean:styles"
    "sass"
    "autoprefixer"
    "cssmin"
  ]

  # Templates
  grunt.registerTask "templates", [
    "assemble"
  ]
