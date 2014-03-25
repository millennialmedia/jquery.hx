(function() {

    
    /*$('.tgt').on( 'hx.xformStart' , function( e , data ) {
        console.log(data);
        //var xform = $.extend( {type: data.type} , data.xform , data.options );
        //$('.tgt2, .tgt3').hx( xform );
    });*/


    /*$('.tgt').on( 'hx.xformComplete' , function( e , data ) {
        console.log(data);
    });*/

    $(document).on( 'ready' , function() {
        $('#target').on( 'click', tests.t3.s1 );
    });


    var tests = {

        // test - null values
        t0: function() {

            $('.tgt')

            .hx([
                {
                    type: 'transform',
                    translate: {x: '+=135'},
                    scale: {x: 2.12},
                    rotate: {x: 1, y: 1, z: 1, a: '+=360'},
                    duration: 600
                },
                {
                    type: 'transform',
                    translate: null,
                    scale: null,
                    rotate: null,
                    duration: 600,
                    delay: 1000
                },
                {
                    type: 'opacity',
                    value: 0.5,
                    duration: 600
                },
                {
                    type: 'opacity',
                    value: null,
                    duration: 600,
                    delay: 1000
                },
                {
                    type: 'background-color',
                    value: '#fff',
                    duration: 600
                },
                {
                    type: 'background-color',
                    value: null,
                    duration: 600,
                    delay: 1000
                }
            ])

            .done(function() {
                console.log('done');
            });
        },

        t1: function() {

            $('.tgt, .tgt2, .tgt3')

            .hx([
                {
                    type: 'transform',
                    translate: {x: '+=200'},
                    rotate: {x: 1, y: 1, z: 1, a: 360},
                    scale: {x: '+=0.2', y: '+=0.2', z: '+=0.2'},
                    duration: 800,
                    easing: 'easeOutBack',
                    done: function() {
                        console.log('transform 1 complete');
                    }
                },
                {
                    type: 'opacity',
                    value: 0.3,
                    duration: 1000,
                    done: function() {
                        console.log('opacity 1 complete');
                    }
                },
                {
                    type: 'opacity',
                    value: 1,
                    duration: 400,
                    done: function() {
                        console.log('opacity 2 complete');
                    }
                }
            ])

            .then(function( resolve , reject ) {
                console.log('cool');
                resolve();
            })

            .hx({
                type: 'transform',
                translate: {x: '-=200'},
                rotate: null,
                scale: {x: '-=0.2', y: '-=0.2', z: '-=0.2'},
                duration: 1000,
                delay: 1000,
                easing: 'easeOutBack',
                done: function() {
                    console.log('transform 2 complete');
                }
            })

            .hx([
                {
                    type: 'transform',
                    rotateZ: 360,
                    duration: 1200,
                    easing: 'easeOutBack',
                    done: function() {
                        console.log('transform 3 complete');
                    }
                },
                {
                    type: 'background-color',
                    value: '#fff',
                    duration: 1200
                }
            ])

            .hx([
                {
                    type: 'transform',
                    rotateZ: 0,
                    duration: 1200,
                    easing: 'easeOutBack',
                    done: function() {
                        console.log('transform 4 complete');
                    }
                },
                {
                    type: 'background-color',
                    value: '',
                    duration: 1200
                }
            ])

            .done(function() {
                console.log('awesome');
            });
        },

        t2: {

            s0: function() {

                $('.tgt, .tgt2')

                .hx({
                    type: 'opacity',
                    value: 0,
                    duration: 800
                })

                .hx([
                    {
                        type: 'transform',
                        translate: {x: '+=200'},
                        rotate: {x: 1, y: 1, z: 1, a: '+=360'},
                        scale: {x: '+=0.2', y: '+=0.2', z: '+=0.2'},
                        duration: 800,
                        delay: 200,
                        easing: 'easeOutBack'
                    },
                    {
                        type: 'opacity',
                        value: 1,
                        duration: 600
                    }
                ])

                .hx({
                    type: 'transform',
                    translate: {x: '-=200'},
                    rotate: {x: 1, y: 1, z: 1, a: '-=360'},
                    scale: {x: '-=0.2', y: '-=0.2', z: '-=0.2'},
                    duration: 1000,
                    easing: 'easeOutBack'
                })

                .then(function( resolve , reject ) {

                    $('.tgt3')

                    .hx([
                        {
                            type: 'transform',
                            rotateZ: '+=360',
                            duration: 1200,
                            easing: 'easeOutBack'
                        },
                        {
                            type: 'transform',
                            rotateZ: 0,
                            duration: 1200,
                            easing: 'easeOutBack'
                        }
                    ])

                    .done( resolve );
                })

                .done( tests.t2.s0 );
            },

            // test - then reject
            s1: function() {

                $('.tgt, .tgt2')

                .hx({
                    type: 'opacity',
                    value: 0,
                    duration: 800
                })

                .hx([
                    {
                        type: 'transform',
                        translate: {x: '+=200'},
                        rotate: {x: 1, y: 1, z: 1, a: '+=360'},
                        scale: {x: '+=0.2', y: '+=0.2', z: '+=0.2'},
                        duration: 800,
                        delay: 200,
                        easing: 'easeOutBack'
                    },
                    {
                        type: 'opacity',
                        value: null,
                        duration: 600
                    }
                ])

                .then(function( resolve , reject ) {
                    reject();
                })

                .done(function() {
                    console.log('Uh-oh! This shouldn\'t execute!');
                });
            }
        },

        t3: {

            // test - defer
            s0: function( incrementor , order ) {

                incrementor = typeof incrementor === 'string' ? incrementor : '+=360';
                order = Array.isArray( order ) ? order : [ '.tgt' , '.tgt2' , '.tgt3' ];

                var tgt1 = $(order[0]).hx();
                var tgt2 = $(order[1]).hx();
                var tgt3 = $(order[2]).hx();

                tgt1.hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt2.hx( 'defer' ).hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt3.hx( 'defer' ).hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt1.done(function() {
                    tgt2.hx( 'resolve' );
                });

                tgt2.done(function() {
                    tgt3.hx( 'resolve' );
                });

                tgt3.done(function() {
                    incrementor = (incrementor === '+=360' ? '-=360' : '+=360');
                    order.reverse();
                    tests.t3.s0( incrementor , order );
                });
            },

            // test - break
            s1: function( incrementor , order ) {

                incrementor = typeof incrementor === 'string' ? incrementor : '+=360';
                order = Array.isArray( order ) ? order : [ '.tgt' , '.tgt2' , '.tgt3' ];

                var selector = order.join( ', ' );

                if (this === $('#target').get( 0 )) {

                    if ($('#target').hasClass( 'break' )) {
                        
                        $('#target').removeClass( 'break' );

                        $(selector)

                        .hx( 'break' )

                        .done(function() {
                            console.log('woop woop!');
                        });

                        return;
                    }
                    else {
                        $('#target').addClass( 'break' );
                    }
                }

                var tgt1 = $(order[0]).hx();
                var tgt2 = $(order[1]).hx();
                var tgt3 = $(order[2]).hx();

                tgt1.hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt2.hx( 'defer' ).hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt3.hx( 'defer' ).hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt1.done(function() {
                    tgt2.hx( 'resolve' );
                });

                tgt2.done(function() {
                    tgt3.hx( 'resolve' );
                });

                tgt3.done(function() {
                    incrementor = (incrementor === '+=360' ? '-=360' : '+=360');
                    order.reverse();
                    tests.t3.s1( incrementor , order );
                });
            },

            // test - clear
            s2: function( incrementor , order ) {

                incrementor = typeof incrementor === 'string' ? incrementor : '+=360';
                order = Array.isArray( order ) ? order : [ '.tgt' , '.tgt2' , '.tgt3' ];

                var selector = order.join( ', ' );

                if (this === $('#target').get( 0 )) {

                    if ($('#target').hasClass( 'clear' )) {
                        
                        $('#target').removeClass( 'clear' );

                        $(selector)

                        .hx( 'clear' )

                        .done(function() {
                            console.log('woop woop!');
                        });

                        return;
                    }
                    else {
                        $('#target').addClass( 'clear' );
                    }
                }

                var tgt1 = $(order[0]).hx();
                var tgt2 = $(order[1]).hx();
                var tgt3 = $(order[2]).hx();

                tgt1.hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt2.hx( 'defer' ).hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt3.hx( 'defer' ).hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                tgt1.done(function() {
                    tgt2.hx( 'resolve' );
                });

                tgt2.done(function() {
                    tgt3.hx( 'resolve' );
                });

                tgt3.done(function() {
                    incrementor = (incrementor === '+=360' ? '-=360' : '+=360');
                    order.reverse();
                    tests.t3.s2( incrementor , order );
                });
            },

            // test - race
            s3: function() {

                var selector = '.tgt, .tgt2, .tgt3';
                var duration = 1200;
                var delay = 300;

                $('.tgt').hx({
                    type: 'transform',
                    rotateZ: '+=180',
                    duration: duration,
                    delay: (Math.floor(Math.random() * delay)),
                    easing: 'easeOutBack'
                });

                $('.tgt2').hx({
                    type: 'transform',
                    rotateZ: '+=180',
                    duration: duration,
                    delay: (Math.floor(Math.random() * delay)),
                    easing: 'easeOutBack'
                });

                $('.tgt3').hx({
                    type: 'transform',
                    rotateZ: '+=180',
                    duration: duration,
                    delay: (Math.floor(Math.random() * delay)),
                    easing: 'easeOutBack'
                });

                var winner = false;

                $(selector)

                .off( 'hx.xformComplete' ).on( 'hx.xformComplete' , function( e , data ) {
                    if (!winner) {
                        console.log(this.className + ' wins!');
                        winner = true;
                    }
                })

                .hx( 'race' , function( resolve , reject ) {
                    $(this).hx( 'resolve' , true );
                    resolve();
                })

                .hx({
                    type: 'transform',
                    translate: {
                        y: ($(selector).hasClass( 'reverse' ) ? 0 : -100)
                    }
                })

                .done(function() {
                    $(this).toggleClass( 'reverse' );
                });
            },

            // test - promises
            s4: function() {

                $('.tgt, .tgt2, .tgt3').off( 'click' ).on( 'click' , function() {
                    $(this).hx( 'resolve' );
                });

                $('.tgt, .tgt2, .tgt3')

                .hx({
                    type: 'transform',
                    rotateZ: '+=360',
                    duration: 1200,
                    easing: 'easeOutBack'
                })
                
                .then(function( resolve , reject ) {
                    console.log('awesome');
                    resolve();
                })

                .defer()

                .hx({
                    type: 'transform',
                    rotateZ: null,
                    duration: 1200,
                    easing: 'easeOutBack'
                })

                .done(function() {
                    console.log('done');
                });
            }
        },

        // test - timed defer, hx_display, & seed order
        t4: function() {

            $('.tgt, .tgt2, .tgt3')

            .css( 'display' , 'none' )

            .hx( 'defer' , 1000 )

            .hx([
                {
                    type: 'opacity',
                    value: null
                },
                {
                    type: 'transform',
                    translate: {y: '+=100'}
                },
                {
                    type: 'transform',
                    rotateZ: '+=180'
                },
                {
                    type: 'transform',
                    rotateZ: null,
                    translate: null
                }
            ])

            .done(function() {
                console.log('done');
            });
        },

        // test - translateZ
        t5: function() {

            $('.tgt-container').css({
                '-webkit-transform-style': 'preserve-3d',
                'transform-style': 'preserve-3d',
                '-webkit-perspective': '1000px',
                '-moz-perspective': '1000px',
                'perspective': '1000px'
            });

            $('.tgt2, .tgt3').css( 'display' , 'none' );

            $('.tgt')

            .hx({
                type: 'transform',
                translate: {x: 200}
            })

            .defer()

            .hx({
                type: 'transform',
                translate: {z: '+=200'},
            });

            setTimeout(function() {
                $('.tgt').hx( 'resolve' );
            }, 1000);
        },

        // test - order
        t6: function() {

            var xform = {};
            var selector = '.tgt';

            if ($('div[class*=\'click\']').length < 1) {

                xform = {
                    type: 'transform',
                    translate: {x: '+=50', y: '+=50'},
                    scale: {x: '+=0.5', y: '+=0.5'},
                    duration: 1200,
                    easing: 'easeOutBack'
                };

                $(selector).addClass( 'click1' );
            }
            else if ($(selector).hasClass( 'click1' )) {

                xform = {
                    type: 'transform',
                    scale: {x: '+=0.5', y: '+=0.5'},
                    order: [ 'scale' , 'translate' ],
                    duration: 1200,
                    easing: 'easeOutBack'
                };

                $(selector).removeClass( 'click1' ).addClass( 'click2' );
            }
            else if ($(selector).hasClass( 'click2' )) {

                xform = {
                    type: 'transform',
                    scale: null,
                    translate: {x: '+=50', y: '+=50'},
                    rotateZ: '+=90',
                    duration: 1200,
                    easing: 'easeOutBack'
                };
            }

            $(selector).hx( xform ).done(function() {
                console.log('done');
            });
        }
    };

}());






















