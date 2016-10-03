(function( $, g ) {
    var Sliders = function() {
        this.service = $( '.sliders' );
        this.buttons = $( '.slider__nav' );
        this.wrapper = $( '.slider__wrapper' );
        this.sliders = $( '.slider' );

        this.defaults = {
            current_button: 'slider__nav--current',
            current_slider: 'slider--current'
        };
    };

    Sliders.prototype = {
        init: function() {
            var context = this,
                screen_width = g.width(),
                defaults = this.defaults;

                if ( this.service && this.service.length > 0 ) {
                    $( this.buttons[ 0 ] ).addClass( defaults.current_button );
                    $( this.sliders[ 0 ] ).addClass( defaults.current_slider );

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

                    this.buttons.on('click', function() {
                        context.eventMenuChange.call( context, $( this ) );

                        context.resizeWrapper();
                    });
                }
        },

        render: function() {
            var context = this,
                defaults = this.defaults,
                screen_width = g.width(),
                current_slider = $( '.' + defaults.current_slider );

            this.sliders.each(function( index, slider ) {
                slider = $( slider );

                if ( !slider.hasClass( defaults.current_slider ) ) {
                    context.setTranslate( slider, ( screen_width * 2 ), 0 );
                }
            });
            this.resizeWrapper();
        },

        resizeWrapper: function() {
            var defaults = this.defaults,
                current_slider = $( '.' + defaults.current_slider );

            this.sliders.css( 'position', 'absolute' );

            this.wrapper.css( 'height', current_slider.outerHeight() );
        },

        setTranslate: function( element, x, y ) {
            element.css({
                '-webkit-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')',
                '-moz-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')',
                '-ms-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')',
                '-o-transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')',
                'transform': 'matrix(1, 0, 0, 1, ' + x + ', ' + y + ')'
            });
        },

        animateTranslateX: function( element, start, value ) {
            var context = this;

            $({
                offset: start
            }).stop().animate({
                offset: value
            }, {
                duration: 650,
                step: function( now ) {
                    context.setTranslate( element, now, 0 );
                }
            });
        },

        eventMenuChange: function( button ) {
            var slider_id = button.data( 'tabs' ),
                slider = $( '.slider--' + slider_id ),
                defaults = this.defaults,
                current_button = $( '.' + defaults.current_button ),
                current_slider = $( '.' + defaults.current_slider ),

                screen_width = g.width();

            if ( slider && slider.length > 0 && !slider.hasClass( defaults.current_slider ) && !button.hasClass( defaults.current_button ) ) {
                current_button.removeClass( defaults.current_button );
                current_slider.removeClass( defaults.current_slider );

                button.addClass( defaults.current_button );
                slider.addClass( defaults.current_slider );

                this.animateTranslateX( current_slider, 0, ( screen_width * 2 ) );
                this.animateTranslateX( slider, ( screen_width * 2 ), 0 );
            }
        }
    };

    $.sliders = function() {
        return new Sliders().init();
    };
}( jQuery, jQuery( window ) ));