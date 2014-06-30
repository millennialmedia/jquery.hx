(function() {

    
    /*$('.tgt').on( 'hx.xformStart' , function( e , data ) {
        console.log(data);
    });*/


    /*$('.tgt').on( 'hx.xformComplete' , function( e , data ) {
        console.log(data);
    });*/


    $(document).on( 'ready' , function() {

        $('#target').on( 'touchstart click' , function( e ) {
            e.preventDefault();
            tests.t13( true );
        });

        $('#target, .tgt, .tgt2, .tgt3').on( 'touchstart mousedown' , function() {
            $(this).addClass( 'indicate' );
        });

        $('#target, .tgt, .tgt2, .tgt3').on( 'touchend mouseup' , function() {
            $('.indicate').removeClass( 'indicate' );
        });
    });

    var tests = {

        // test - null values
        t0: function() {

            $('.tgt')
            /*.hx({
                type: 'transform',
                translate: {x: '+=135', z: '+=135'},
                scale: {x: 2.12},
                rotateZ: '+=360',
                duration: 600
            })*/
            .hx([
                {
                    type: 'opacity',
                    value: 0.8,
                    duration: 800
                },
                {
                    type: 'transform',
                    translate: {x: '+=135'},
                    rotateZ: '+=45'
                },
                {
                    type: 'transform',
                    translate: {y: '+=135'},
                    rotateZ: '+=45'
                }
            ])
            .then(function( resolve ) {
                $(this).hx( 'reset' );
                console.log(this);
                resolve();
            })
            .paintSync( 'transform' )
            .done(function() {
                console.log($(this).hx( 'get' , 'transform' , 'translate' ));
            });

            /*$('.tgt')

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
            ]);*/

            /*.done(function() {
                console.log('done');
            });*/
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

                $(order[0]).hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                $(order[1])
                .hx( 'defer' )
                .hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                $(order[2])
                .hx( 'defer' )
                .hx({
                    type: 'transform',
                    rotateZ: incrementor,
                    duration: 1200,
                    easing: 'easeOutBack'
                });

                $(order[0]).hx( 'done' , function() {
                    $(order[1]).hx( 'resolve' );
                });

                $(order[1]).hx( 'done' , function() {
                    $(order[2]).hx( 'resolve' );
                });

                $(order[2]).hx( 'done' , function() {
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
                var duration = 800;
                var delay = 500;

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
                        var winnerName = (this.className).replace( /\sreverse/i , '' );
                        console.log(winnerName + ' wins!');
                        winner = true;
                    }
                })

                .hx( 'race' , function( resolve ) {
                    resolve();
                    $(this).hx( 'resolve' , true );
                })

                .hx({
                    type: 'transform',
                    translate: {
                        y: ($(selector).hasClass( 'reverse' ) ? 0 : 100)
                    },
                    order: [ 'translate' , 'rotateZ' ]
                })

                .done(function() {

                    $(this).toggleClass( 'reverse' );

                    /*$(this).hx( 'reset' , 'transform' );

                    var comp = [];
                    var out = $(this).hx( 'get' , comp , 'transform' );
                    console.log(comp);*/
                });
            },

            // test - promises
            s4: function() {

                function cool() {
                    $(this).hx( 'resolve' );
                }

                $('.tgt, .tgt2, .tgt3')

                .off( 'touchstart click' , cool )

                .on( 'touchstart click' , cool )

                .hx([
                    {
                        type: 'opacity',
                        value: 0.5,
                        duration: 1000
                    },
                    /*{
                        type: 'background-color',
                        value: '#fff',
                        duration: 500
                    },
                    {
                        type: 'background-color',
                        value: null,
                        duration: 500
                    },*/
                    {
                        type: 'transform',
                        translate: {y: 100},
                        rotateZ: 360,
                        duration: 1000,
                        easing: 'easeOutBack'
                    }
                ])
                
                .then(function() {
                    console.log('awesome');
                    console.log(this);
                })

                .hx([
                    {
                        type: 'opacity',
                        value: null,
                        duration: 1000
                    },
                    {
                        type: 'background-color',
                        value: null,
                        duration: 1000
                    },
                    {
                        type: 'transform',
                        translate: null,
                        rotateZ: null,
                        duration: 1000,
                        easing: 'easeOutBack'
                    }
                ])

                .done(function() {
                    console.log('done');
                });
            }
        },

        // test - timed defer, hx_display, & seed order
        t4: function() {

            $('.tgt, .tgt2, .tgt3')

            .css( 'opacity' , 0 )

            .hx( 'defer' , 1000 )

            .hx([
                {
                    type: 'opacity',
                    value: 1
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
        },

        // test - zero duration
        t7: function() {

            var start, move, diff, target;
            var selector = '.tgt, .tgt2, .tgt3';

            $(selector).hx( 'update' , {
                type: 'opacity',
                value: 1
            });

            function reset() {
                start = {};
                move = {now:{},last:{}};
                diff = {total:{},inst:{}};
            }

            function coolStart( e ) {

                e.preventDefault();
                e = e.originalEvent;

                reset();

                if (e.type === 'touchstart') {
                    start.x = e.touches[0].clientX;
                    start.y = e.touches[0].clientY;
                }
                else if (e.type === 'mousedown') {
                    start.x = e.clientX;
                    start.y = e.clientY;
                }

                target = this;

                $(window).on( 'touchmove mousemove' , coolMove );
                $(window).on( 'touchend mouseup' , coolEnd );
            }

            function coolMove( e ) {

                e.preventDefault();
                e = e.originalEvent;

                move.last.x = move.now.x || start.x;
                move.last.y = move.now.y || start.y;

                if (e.type === 'touchmove') {
                    move.now.x = e.touches[0].clientX;
                    move.now.y = e.touches[0].clientY;
                }
                else if (e.type === 'mousemove') {
                    move.now.x = e.clientX;
                    move.now.y = e.clientY;
                }

                diff.total.x = move.now.x - start.x;
                diff.total.y = move.now.y - start.y;

                diff.inst.x = move.now.x - move.last.x;
                diff.inst.y = move.now.y - move.last.y;

                $(target).hx( 'zero' , [
                    {
                        type: 'opacity',
                        value: ('+=' + ((diff.inst.x - diff.inst.y)/100))
                    },
                    {
                        type: 'transform',
                        translate: {
                            x: ('+=' + diff.inst.x),
                            y: ('+=' + diff.inst.y)
                        },
                        scale: {
                            x: ('+=' + (diff.inst.x/100)),
                            y: ('+=' + (diff.inst.y/100))
                        }
                    }
                ]);
            }

            function coolEnd( e ) {
                $(window).off( 'touchmove mousemove' , coolMove );
                $(window).off( 'touchend mouseup' , coolEnd );
                console.log($(target).hx( 'get' ));
                console.log(target._hx);
            }

            $(selector).on( 'touchstart mousedown' , coolStart );
        },

        // test - persistent transforms
        t8: function() {

            var selector = '.tgt,.tgt2,.tgt3';

            if (!$(selector).hasClass( 'click1' )) {
                $(selector).hx({
                    type: 'transform',
                    translate: {x: '+=100'}
                });
                $(selector).addClass( 'click1' );
            }
            else {
                $(selector).hx({
                    type: 'transform',
                    translate: {y: '+=100'}
                });
                $(selector).removeClass( 'click1' );
            }
        },

        // test - null transitions
        t9: function() {

            var selector = '.tgt';

            $(selector).hx({
                type: 'transform',
                translate: {y: '+=300'},
                duration: 800
            });

            setTimeout(function() {

                $(selector)
                .hx( 'clear' )
                .hx({
                    type: 'transform',
                    translate: {y: 0},
                    duration: 0
                });

            }, 400 );
        },

        // test - update component
        t10: function() {

            var selector = '.tgt,.tgt2,.tgt3';
            var rand = Math.round(Math.random() * 100);

            $(selector)
            .hx({
                type: 'transform',
                translate: {x: ('+=' + rand), y: ('+=' + rand)}
            })
            .update({
                type: 'transform',
                translate: {x: 100, y: 100}
            });
        },

        // test - cancel cleared pods
        t11: function() {

            var selector = '.tgt';

            $(selector).hx([
                {
                    type: 'transform',
                    translate: {y: '+=300'},
                    duration: 800,
                    done: function() {
                        console.log('done_a');
                    }
                },
                {
                    type: 'opacity',
                    value: 0.3,
                    duration: 800,
                    done: function() {
                        console.log('done_b');
                    }
                }

            ])
            .hx({
                type: 'opacity',
                value: null,
                duration: 800,
                done: function() {
                    console.log('done_c');
                }
            })
            .hx({
                type: 'opacity',
                value: 0,
                duration: 800,
                done: function() {
                    console.log('done_d');
                }
            })
            .done(function() {
                console.log('done1');
            });

            setTimeout(function() {

                $(selector)
                .hx( 'clear' )
                .hx([
                    {
                        type: 'transform',
                        translate: null,
                        duration: 800
                    },
                    {
                        type: 'opacity',
                        value: null,
                        duration: 800
                    }
                ])
                .done(function() {
                    console.log('done2');
                });
    
            }, 400 );
        },

        // test - gravity easing
        t12: function() {

            var selector = '.tgt';

            if ($(selector).hasClass( 'clicked-once' )) {
                $(selector).hx({
                    type: 'transform',
                    translate: {x: '+=15', y: 0},
                    rotateX: '+=20'
                });
                $(selector).removeClass( 'clicked-once' );
                return;
            }

            $('.tgt2')
            .hx( 'defer' )
            .then(function( resolve , reject ) {
                //throw new Error( 'whaaaaat' );
                //reject(0);
                var stupid;
                stupid.dumb = 5;
                console.log('test');
            })
            .hx({
                type: 'transform',
                rotateZ: 360,
                duration: 1200,
                easing: 'easeInOutBack'
            });

            $(selector)
            .hx([
                {
                    type: 'opacity',
                    value: 0.5,
                    duration: 1200,
                    easing: 'easeInOutBack'
                },
                {
                    type: 'transform',
                    //matrix: {a2: '-=15'},
                    translate: {y: 300},
                    rotateZ: 20,
                    scale: {x: 0.5, y: 0.5},
                    //order: [ 'scale' , 'translate' , 'rotateZ' ],
                    duration: 1200,
                    easing: 'easeInOutBack'
                }
            ])
            .done(function() {
                console.log('done!');
                $('.tgt2').hx( 'resolve' );
            });

            $(selector).addClass( 'clicked-once' );

            //console.log($(selector).get(0)._hx);


            /*var selector = '.tgt';

            $(selector).hx({
                type: 'transform',
                translate: {y: $(selector).hasClass( 'fall' ) ? 0 : 600},
                duration: 1200,
                easing: $(selector).hasClass( 'fall' ) ? 'gravityUp' : 'gravityDown'
            })
            .done(function() {
                $(this).toggleClass( 'fall' );
                tests.t12();
            });*/
        },

        // test - request animation frame
        t13: function( addListener ) {

            //var selector = '.tgt,.tgt2,.tgt3';
            var selector = '.tgt';
            var duration = 800;

            /*setTimeout(function() {
                $('.tgt').hx( 'resolve' , true ).clear();
            },600);*/

            $(selector).hx([
                {
                    type: 'transform',
                    rotateZ: '+=180',
                    duration: duration,
                    easing: 'easeOutBack'
                },
                {
                    type: 'transform',
                    translate: ($(selector).hasClass( 'reverse' ) ? null : {y: '+=100'}),
                    /*translate: {
                        y: ($(selector).hasClass( 'reverse' ) ? '-=100' : '+=100')
                    },*/
                    duration: duration,
                    order: [ 'translate' , 'rotateZ' ]
                },
                {
                    type: 'opacity',
                    value: ($(selector).hasClass( 'reverse' ) ? null : 0.1),
                    duration: (duration * 2),
                    easing: 'linear'
                }
            ])
            .done(function() {
                console.log(
                    $(this).hx( 'get' , 'transform' )
                );
                //tests.t13();
            });

            $(selector).toggleClass( 'reverse' );

            /*if (!addListener) {
                return;
            }

            $('#target')
            .off( 'touchstart click' )
            .on( 'touchstart click' , function ( e ) {

                e.preventDefault();

                $(selector).hx( 'clear' );

                $('#target')
                .off( 'touchstart click' )
                .on( 'touchstart click' , function( e ) {

                    e.preventDefault();
                    tests.t13( true );
                });
            });*/
        }
    };

}());






















