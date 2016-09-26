(function( $, global ) {
    var init = function() {
        var screen_width = $( window ).width();
            // team = $( '.team' );
            // other = $( '.other' );

        $.nav();
        $.startscreen();
        $.gmap();
        $.carousel();
        $.modal();
        $.tabs();
        // $.preloader();

        if ( screen_width > 767) {
            $.service_tab();
        };
    };

    $( document ).on( 'DOMContentLoaded', init );
    // $( window ).resize( init());
}( jQuery, jQuery( window ) ));
