window.hxManager = (function() {


    function hxManager( j ) {

        if (j instanceof hxManager) {
            return j;
        }

        var that = this;

        j.each(function( i ) {
            that[i] = hxManager.DomNodeFactory( j[i] );
        });

        Object.defineProperty( that , 'length' , {
            get: function() {
                return j.length;
            }
        });
    }


    var hxManager_prototype = (hxManager.prototype = Object.create( jQuery.prototype ));


    hxManager_prototype._addAnimationPod = function( bundle ) {

        var that = this;

        that.each(function( i ) {

            var pod = PodFactory( that[i] , 'animation' );

            ensureBundle( bundle ).forEach(function( seed ) {

                var bean = Bean( seed );
                pod.addBean( bean );
            });

            that[i]._hx.addAnimationPod( pod );
        });

        return that;
    };


    hxManager_prototype._addPromisePod = function( func , method ) {

        /*if (typeof func !== 'function') {
            throw new TypeError( 'PromisePod requires a function.' );
        }*/

        method = method || 'all';

        var that = this;
        var micro = [];
        var pods = [];
        var _func = func.bind( that );

        that.eachNode(function( node_hx , node ) {

            // create a promisePod for each dom node
            var pod = PodFactory( node , 'promise' );

            // when the pod reaches its turn in the queue, resolve its promise
            pod.when( 'promiseMade' , function() {
                pod.resolvePromise();
            });

            // create a microPromise for each pod
            var microPromise = new Promise(function( resolve ) {
                // when the pod is resolved, resolve the microPromise
                pod.when( 'promiseResolved' , resolve );
            });

            // add the promise to the dom node queue
            node_hx.addPromisePod( pod );

            pods.push( pod );
            micro.push( microPromise );
        });

        // when the appropriate microPromises have been resolved, create the macroPromise
        Promise[ method ]( micro ).then(function() {

            var macroPromise = new Promise( _func );

            // if the macroPromise is resolved, resolve the pods
            macroPromise.then(function() {
                pods.forEach(function( pod ) {
                    pod.resolvePod();
                });
            });

            // otherwise, clear the queue so we can start again
            macroPromise.catch(function( err ) {
                that.clear();
                if (err instanceof Error) {
                    $.hx.error( err );
                }
            });
        });

        return that;
    };


    hxManager_prototype.eachNode = function( callback ) {
        var that = this;
        toArray( that ).forEach(function( node , i ) {
            callback( node._hx , node , i );
        });
        return that;
    };


    hxManager_prototype.animate = function( bundle ) {

        var that = this;

        that.eachNode(function( node_hx , node ) {

            var pod = PodFactory( node , 'precision' );

            ensureBundle( bundle ).forEach(function( seed ) {

                var bean = Bean( seed );
                var iterator = new hxManager.IteratorMOJO( node , bean );

                pod.addBean( iterator );
            });

            node_hx.addPrecisionPod( pod );
        });

        return that;
    };


    hxManager_prototype.pause = function() {
        return this._precisionPodAction( 'pause' );
    };


    hxManager_prototype.resume = function() {
        return this._precisionPodAction( 'resume' );
    };


    hxManager_prototype._precisionPodAction = function( method ) {

        var that = this;

        var pods = toArray( that )
            .map(function( node ) {
                return node._hx.getCurrentPod();
            })
            .filter(function( pod ) {
                return pod.type === 'precision';
            });

        if (pods.length !== that.length) {
            $.hx.subscribe( 0 , function() {
                that._precisionPodAction( method );
            });
        }
        else {
            pods.forEach(function( pod ) {
                pod[ method ]();
            });
        }

        return that;
    };


    hxManager_prototype.paint = function( type ) {

        var that = this;
        
        that.eachNode(function( node_hx ) {
            node_hx.paint( type );
        });

        return that;
    };
    

    hxManager_prototype.reset = function( type ) {

        var that = this;

        that.eachNode(function( node_hx ) {
            node_hx.resetComponents( type );
        });

        return that;
    };


    hxManager_prototype.then = function( func ) {
        return this._addPromisePod( func );
    };


    hxManager_prototype.race = function( func ) {
        return this._addPromisePod( func , 'race' );
    };


    hxManager_prototype.defer = function( time ) {
        return this._addPromisePod(function( resolve ) {
            if (time) {
                $.hx.subscribe( time , resolve );
            }
        });
    };


    hxManager_prototype.update = function( bundle ) {

        // update a node's components without applying the transition

        var that = this;

        ensureBundle( bundle ).forEach(function( seed ) {

            that.eachNode(function( node_hx ) {

                var bean = Bean( seed );
                node_hx.updateComponent( bean );
            });
        });

        return that;
    };


    hxManager_prototype.resolve = function( all ) {

        var that = this;

        // all controls whether all pod types or only promise pods will be resolved
        all = (typeof all !== 'undefined' ? all : false);

        // force resolve the current pod in each queue
        that.eachNode(function( node_hx ) {

            var pod = node_hx.getCurrentPod();

            if (pod && (all || (!all && pod.type === 'promise'))) {
                pod.resolvePod();
            }
        });

        return that;
    };


    hxManager_prototype.clear = function() {

        var that = this;
        
        // clear all pods in each queue
        that.eachNode(function( node_hx ) {
            node_hx.clearQueue();
        });

        return that;
    };


    hxManager_prototype.break = function() {

        var that = this;
        
        // clear all but the current pod in each queue
        that.eachNode(function( node_hx ) {
            node_hx.clearQueue( false );
        });

        // resolve any remaining promise pods
        return that.resolve();
    };


    hxManager_prototype.zero = function( hxArgs ) {

        var that = this;

        // update the stored components
        that.update( hxArgs );

        // remove any stored transitions
        that.eachNode(function( node_hx ) {
            node_hx.resetTransition();
        });

        // run paint
        return that.paint();
    };


    // !!! done does not return the hxManager instance
    hxManager_prototype.done = function( func ) {

        var that = this;

        that._addPromisePod(function( resolve ) {
            (func || function() {}).call( that );
            resolve();
        });
    };


    // !!! get does not return the hxManager instance
    hxManager_prototype.get = function( type , property , pretty ) {

        return toArray( this ).map(function( node ) {
            return node._hx.getComponents( type , property , pretty );
        });
    };


    // !!! clean does not return the hxManager instance
    hxManager_prototype.clean = function() {

        this.eachNode(function( node_hx ) {
            node_hx.clean();
        });
    };


    function Bean( seed ) {
        return new hxManager.Bean( seed );
    }


    function PodFactory( node , type ) {
        return hxManager.PodFactory( node , type );
    }


    function toArray( hxm ) {
        return hxm.toArray();
    }


    function ensureBundle( bundle ) {
        return (bundle instanceof Array ? bundle : [ bundle ]);
    }


    return hxManager;

    
}());



























