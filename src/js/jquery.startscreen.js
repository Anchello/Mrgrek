(function( $, g ) {
    var Startscreen = function() {
        this.startscreen = $( '.startscreen' );
    };

    Startscreen.prototype = {
        init: function() {
            var context = this;

            if ( this.startscreen && this.startscreen.length > 0 ) {
                g.on('load', function() {
                    setTimeout(function() {
                        context.render.call( context );
                    }, 300);
                });

                g.on('resize', function() {
                    setTimeout(function() {
                        context.render.call( context );
                    }, 300);
                });
            }
        },

        render: function() {
            var promo = $( '.promo' ),
                title = $( '.news-section__title' ),
                height_promo = promo.outerHeight(),
                height_title = title.outerHeight(),
                screen_width = g.width(),
                // height = header_promo + header_title - 10 + 'px',
                width = 100 + '%';

            if ( screen_width < 1200 ) {
                width = (screen_width * (-0.45) + 644).toFixed(0) +'%';
            } else {
                width = 100 + '%';
            };

            if ( screen_width < 768 ) {
                height = height_promo + height_title - 8 + 'px';
            } else {
                height = height_promo + height_title - 10 + 'px';
            };

            this.startscreen.css( {'background-size': width + ' ' + height} );
        }
    };

    $.startscreen = function() {
        return new Startscreen().init();
    };
}( jQuery, jQuery( window ) ));