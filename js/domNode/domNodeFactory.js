var MOJO = require( 'mojo' );
var helper = require( 'shared/helper' );
var Queue = require( 'domNode/queue' );
var ComponentMOJO = require( 'domNode/componentMOJO' );
var TransitionMOJO = require( 'domNode/transitionMOJO' );
var CSSProperty = require( 'domNode/cssProperty' );
var PropertyMap = require( 'shared/config' ).properties;
var Prefix = require( 'shared/vendorPatch' ).prefix;

var BEAN_START = 'beanStart';
var BEAN_COMPLETE = 'beanComplete';
var CLUSTER_COMPLETE = 'clusterComplete';
var POD_PAUSED = 'podPaused';
var POD_RESUMED = 'podResumed';
var POD_COMPLETE = 'podComplete';
var POD_CANCELED = 'podCanceled';

module.exports = DomNodeFactory;

function DomNodeFactory( element ) {
    // if this is already an hx element, return it
    if (!helper.isUndef( element.$hx )) {
        return element;
    }
    // otherwise, create a new hx element
    var $hx = new MOJO(getBoundModule( hxModule , element ));
    $hx.queue = new Queue();
    $hx.componentMOJO = new ComponentMOJO();
    $hx.transitionMOJO = new TransitionMOJO();
    element.$hx = $hx;
    return element;
}

var hxModule = {
    paint: function( typeArray ) {
        var that = this;
        var $hx = that.$hx;
        var style = {};
        if (helper.isUndef( typeArray )) {
            typeArray = helper.keys( $hx.getOrder() );
        }
        else {
            typeArray = helper.ensureArray( typeArray );
        }
        typeArray.forEach(function( type ) {
            var property = Prefix( type );
            var string = $hx.getStyleString( type );
            style[property] = string;
        });
        $(that).css( style );
    },
    handleMOJO: function( e ) {
        var that = this;
        var $hx = that.$hx;
        var args = arguments;
        var type, bean, pod;
        switch (e.type) {
            case BEAN_START:
                bean = args[1];
                $(that).trigger( 'hx.start' , {
                    ref: bean.ref,
                    bean: bean.seed
                });
            break;
            case BEAN_COMPLETE:
                bean = args[1];
                $(that).trigger( 'hx.end' , {
                    ref: bean.ref,
                    bean: bean.seed
                });
                bean.options.done();
            break;
            case CLUSTER_COMPLETE:
                type = args[1];
                $hx.deleteTransition( type );
                $hx.applyTransition();
            break;
            case POD_PAUSED:
            case POD_RESUMED:
                var evtString = ('hx.' + (e.type === POD_PAUSED ? 'pause' : 'resume'));
                pod = args[1];
                $(that).trigger( evtString , {
                    progress: pod.progress
                });
            break;
            case POD_COMPLETE:
                pod = args[1];
                pod.dispel( POD_COMPLETE , $hx );
                $hx.proceed();
            break;
            case POD_CANCELED:
                pod = args[1];
                if (pod.type === 'promise') {
                    pod.dispel( POD_COMPLETE );
                }
                else {
                    pod.dispel( POD_COMPLETE , $hx );
                    pod.once( POD_COMPLETE , function() {
                        if (!$hx.getPodCount( 'animation' )) {
                            $hx.resetTransition();
                            $hx.applyTransition();
                        }
                    });
                }
            break;
        }
    },
    setTransition: function( bean ) {
        this.$hx.transitionMOJO.setTransition( bean );
    },
    deleteTransition: function( type ) {
        this.$hx.transitionMOJO.deleteTransition( type );
    },
    resetTransition: function() {
        var transitionMOJO = this.$hx.transitionMOJO;
        helper.each( transitionMOJO , function( val , type ) {
            transitionMOJO.deleteTransition( type );
        });
    },
    applyTransition: function() {
        var that = this;
        var property = Prefix( 'transition' );
        var string = that.$hx.getTransitionString();
        if (that.style.transition === string) {
            return;
        }
        $(that).css( property , string );
    },
    getComponents: function( find , pretty ) {
        find = PropertyMap[find] || find;
        pretty = (!helper.isUndef( pretty ) ? pretty : true);
        var $hx = this.$hx;
        var components = $hx.componentMOJO.getComponents( find );
        var out = {};
        if (helper.instOf( components , ComponentMOJO )) {
            components.each(function( styleObj , key ) {
                out[key] = $hx.getComponents( key , pretty );
            });
        }
        else if (helper.instOf( components , CSSProperty )) {
            out = getProperty( components );
        }
        else if (!helper.isUndef( components )) {
            helper.each( components , function( property , key ) {
                key = getKey( key );
                property = getProperty( property );
                if (key === 'value') {
                    out = property;
                }
                else {
                    out[key] = property;
                }
            });
        }
        function getProperty( property ) {
            return (pretty ? property.values : property.clone());
        }
        function getKey( key ) {
            return (pretty ? (PropertyMap.inverse[ key ] || key) : key);
        }
        return out;
    },
    getOrder: function( type ) {
        return this.$hx.componentMOJO.getOrder( type );
    },
    updateComponent: function( bean ) {
        this.$hx.componentMOJO.updateComponent( bean );
    },
    resetComponents: function( type ) {
        var componentMOJO = this.$hx.componentMOJO;
        if (type) {
            componentMOJO.remove( type );
        }
        else {
            componentMOJO.each(function( val , key ) {
                componentMOJO.remove( key );
            });
        }
    },
    getStyleString: function( type ) {
        return this.$hx.componentMOJO.getString( type );
    },
    getTransitionString: function() {
        return this.$hx.transitionMOJO.getString();
    },
    addPod: function( pod ) {
        var $hx = this.$hx;
        var evt = [
            BEAN_START,
            BEAN_COMPLETE,
            CLUSTER_COMPLETE,
            POD_PAUSED,
            POD_RESUMED,
            POD_COMPLETE,
            POD_CANCELED
        ];
        pod.when( evt , $hx );
        $hx.queue.pushPod( pod );
    },
    proceed: function() {
        return this.$hx.queue.proceed();
    },
    clearQueue: function( all ) {
        this.$hx.queue.clear( all );
    },
    getCurrentPod: function() {
        return this.$hx.queue[0] || false;
    },
    getPodCount: function( type ) {
        return this.$hx.queue.getPodCount( type );
    },
    cleanup: function() {
        delete this.$hx;
    }
};


function getBoundModule( module , context ) {
    var scope = {}, func;
    for (var key in module) {
        func = module[key];
        scope[key] = func.bind( context );
    }
    return scope;
}
