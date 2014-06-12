window.hxManager = (function() {


    function hxManager( j ) {

        if (j instanceof hxManager) {
            return j;
        }

        var nodes = [];

        j.each(function() {
            nodes.push(
                hxManager.DomNodeFactory( this )
            );
        });

        Object.defineProperty( this , 'length' , {
            get: function() {
                return nodes.length;
            },
            configurable: true
        });

        $.extend( this , nodes );
    }


    var hxManager_prototype = (hxManager.prototype = Object.create( jQuery.prototype ));


    hxManager_prototype._addXformPod = function( bundle ) {

        var that = this;

        that.each(function( i ) {

            var pod = hxManager.PodFactory( that[i] , 'xform' );

            bundle.forEach(function( seed ) {

                var bean = new hxManager.Bean( seed );
                pod.addBean( bean );

            });

            that[i]._hx.addXformPod( pod );
        });
    };


    hxManager_prototype._addPromisePod = function( func , method ) {

        method = method || 'all';

        var that = this;
        var micro = [];
        var pods = [];
        var _func = func.bind( that );
        var clear = that.clear.bind( that );

        that.each(function( i ) {

            // create a promisePod for each dom node
            var pod = hxManager.PodFactory( that[i] , 'promise' );

            // when the pod reaches its turn in the queue, resolve its promise
            pod.when( 'promiseMade' , pod.resolvePromise.bind( pod ));

            // create a microPromise for each pod
            var microPromise = new Promise(function( resolve ) {
                // when the pod is resolved, resolve the microPromise
                pod.when( 'promiseResolved' , resolve );
            });

            // add the promise to the dom node queue
            that[i]._hx.addPromisePod( pod );

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
                clear();
                if (err instanceof Error) {
                    console.error( err.stack );
                }
            });
        });
    };


    hxManager_prototype.then = function( func ) {

        var that = this;

        if (typeof func === 'function') {
            that._addPromisePod( func );
        }

        return that;
    };


    hxManager_prototype.race = function( func ) {

        var that = this;
        
        if (typeof func === 'function') {
            that._addPromisePod( func , 'race' );
        }

        return that;
    };


    hxManager_prototype.defer = function( time ) {

        var that = this;
        
        that._addPromisePod(function( resolve , reject ) {
            if (typeof time !== 'undefined') {
                setTimeout( resolve , time );
            }
        });

        return that;
    };


    hxManager_prototype.update = function( seed ) {

        // update a node's components without applying the transition

        var that = this;

        if (typeof seed === 'object') {

            seed = Array.isArray( seed ) ? hxManager.helper.array.last( seed ) : seed;

            that.each(function( i ) {

                var bean = new hxManager.Bean( seed );
                that[i]._hx.updateComponent( bean );

            });
        }

        return that;
    };


    hxManager_prototype.resolve = function( all ) {

        var that = this;

        // all controls whether all pod types or only promise pods will be resolved
        all = (typeof all !== 'undefined' ? all : false);

        // force resolve the current pod in each queue
        that.each(function( i ) {

            var pod = that[i]._hx.getCurrentPod();

            if (pod && (all || (!all && pod.type === 'promise'))) {
                pod.resolvePod();
            }

        });

        return that;
    };


    hxManager_prototype.clear = function() {

        var that = this;
        
        // clear all pods in each queue            
        that.each(function( i ) {

            that[i]._hx.clearQueue();

        });

        return that;
    };


    hxManager_prototype.break = function() {

        var that = this;
        
        // clear all but the current pod in each queue
        that.each(function( i ) {

            that[i]._hx.clearQueue( false );

        });

        // resolve any remaining promise pods
        that.resolve();

        return that;
    };


    hxManager_prototype.zero = function( hxArgs ) {

        // duration is intentionally passed as a string to
        // avoid being overridden by VendorPatch.getDuration

        var that = this;

        var options = {
            duration: '0',
            delay: 0,
            fallback: false,
            listen: false
        };

        hxArgs = hxArgs instanceof Array ? hxArgs : [ hxArgs ];

        for (var i = 0; i < hxArgs.length; i++) {
            $.extend( hxArgs[i] , options );
        }

        that.hx( hxArgs );

        return that;
    };


    hxManager_prototype.done = function( func ) {

        var that = this;

        if (typeof func !== 'function') {
            return;
        }
        
        function resolution( resolve , reject ) {
            func.call( that );
            resolve();
        }

        that._addPromisePod( resolution );
    };


    return hxManager;

    
}());



























