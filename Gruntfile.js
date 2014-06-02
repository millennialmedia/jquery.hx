module.exports = function( grunt ) {


    var libs = [
        'js/hxManager.js',
        'js/prototypes/when.js',
        'js/config.js',
        'js/helper.js',
        'js/vendorPatch.js',
        'js/easing.js',
        'js/getters.js',
        'js/animator.js',
        'js/bean.js',
        'js/pod.js',
        'js/queue.js',
        'js/domNode.js',
        'js/hx.js',
        'lib/promise-0.1.1.min.js'
    ];


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint : {
            all : [ 'Gruntfile.js' , 'js/*.js' , 'js/prototypes/*.js' ]
        },

        clean : [ 'hx-*.js' ],

        concat: {
            options: {
                banner : '/*! <%= pkg.name %> - <%= pkg.version %> nightly - <%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n\n'
            },
            build: {
                src: libs,
                dest: 'hx-<%= pkg.version %>n.js'
            }
        },

        uglify: {
            options: {
                banner : '/*! <%= pkg.name %> - <%= pkg.version %> nightly - <%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            release : {
                files : {
                    'hx-<%= pkg.version %>n.min.js' : libs
                }
            }
        }
    });


    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );


    grunt.registerTask( 'default' , [ 'jshint' , 'clean' , 'uglify' ]);
    grunt.registerTask( 'dev' , [ 'jshint' , 'clean' , 'concat' ]);
};


















