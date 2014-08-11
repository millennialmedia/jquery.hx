(function( $ , hxManager , shift ) {

    
    $.fn.hx = function() {

        var args = arguments;
        var hxm = new hxManager( this );
        var out;

        switch (typeof args[0]) {

            case 'string':
                var method = shift( args );

                if (typeof hxm[method] !== 'function') {
                    throw new TypeError( method + ' is not a function.' );
                }

                out = hxm[method].apply( hxm , args );
            break;

            case 'object':
                out = hxm.animate( args[0] );
            break;

            default:
                out = hxm;
            break;
        }

        return out;
    };

 
}( jQuery , hxManager , hxManager.Helper.shift ));





















