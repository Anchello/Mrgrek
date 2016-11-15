(function( $, global ) {
    var init = function() {
        var screen_width = $( window ).width();

        $.nav();
        $.startscreen();
        $.gmap();
        $.carousel();
        $.modal();
        $.tabs();

        if ( screen_width > 767) {
            $.sliders();
        };
    };

    $(document).ready(function(){
        $(".sender").fadeOut(6000);
    });

    $( document ).on( 'DOMContentLoaded', init );
}( jQuery, jQuery( window ) ));
