(function( $, g ) {
    var Modal = function() {
        this.body = $( 'body' );
        this.overlay = $( '.modal-overlay' );
        this.substrate = $( '.modal-overlay__substrate' );
        this.modals = $( '.modal' );
        this.buttons = $( '.modal-button' );
        this.closes = $( '.modal__close' );

        this.defaults = {
            body_cls: 'page--overlay',
            modal_cls: 'modal--show',
            overlay_cls: 'modal-overlay--show'
        };
    };

    Modal.prototype = {
        init: function() {
            var context = this,
                defaults = this.defaults,
                doc = $( document );

            if ( this.modals && this.modals.length > 0 ) {
                g.on('load', function() {
                    context.render.call( context );
                });

                g.on('resize', function() {
                    context.resizeModals.call( context );
                });

                this.buttons.on('click', function( e ) {
                    context.eventShowModal.call( context, $( this ) );

                    e.preventDefault();

                    return false;
                });

                this.closes.on('click', function( e ) {
                    context.eventCloseModal.call( context, $( this ) );

                    e.preventDefault();

                    return false;
                });

                this.substrate.on('click', function( e ) {
                    context.modalClose.call( context, $( '.' + defaults.modal_cls ) );

                    e.preventDefault();

                    return false;
                });

                // doc.on('keydown', function( e ) {
                //     if( e.keyCode === 27 ) {
                //         context.modalClose.call( context, $( '.' + defaults.modal_cls ) );
                //
                //         e.preventDefault();
                //
                //         return false;
                //     }
                // });
            }
        },

        render: function() {
            this.overlay.css( 'opacity', 0 );

            this.resizeModals();
        },

        resizeModals: function() {
            var context = this,
                defaults = this.defaults,
                offset = g.width();

            this.modals.each(function( index, modal ) {
                modal = $( modal );

                if ( !modal.hasClass( defaults.modal_cls ) ) {
                    context.setTranslateX( modal, ( - offset ) );
                }
            });
        },

        setTranslateX: function( element, value ) {
            element.css({
                '-webkit-transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)',
                '-moz-transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)',
                '-ms-transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)',
                '-o-transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)',
                'transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)'
            });
        },

        setTranslateY: function( element, x, y ) {
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
                    context.setTranslateX( element, now );
                }
            });
        },

        animateTranslateY: function( element, start, x, y ) {
            var context = this;

            $({
                offset: start
            }).stop().animate({
                offset: y
            }, {
                duration: 650,
                step: function( now ) {
                    context.setTranslateY( element, x, now );
                }
            });
        },

        modalClose: function( modal, opened ) {
            var context = this,
                offset = g.width(),
                defaults = this.defaults;

            if ( modal.length > 0 && modal.hasClass( defaults.modal_cls ) ) {
                if ( !opened ) {
                    this.overlay.animate({
                        opacity: 0
                    }, 650);
                }

                this.animateTranslateX( modal, 0, ( offset * 2 ) );

                setTimeout(function() {
                    if ( !opened ) {
                        context.body.removeClass( defaults.body_cls );
                        context.overlay.removeClass( defaults.overlay_cls );
                    }

                    modal.removeClass( defaults.modal_cls );

                    setTimeout(function() {
                        context.setTranslateX( modal, ( - offset ) );
                    }, 10);
                }, 650);
            }
        },

        modalCloseDown: function( modal ) {
            var context = this,
                offset = g.height(),
                defaults = this.defaults;

            if ( modal.length > 0 && modal.hasClass( defaults.modal_cls ) ) {
                this.animateTranslateY( modal, 0, 0, offset );

                setTimeout(function() {
                    context.body.removeClass( defaults.body_cls );
                    context.overlay.removeClass( defaults.overlay_cls );

                    modal.removeClass( defaults.modal_cls );

                    setTimeout(function() {
                        context.setTranslateY( modal, ( - offset ), 0 );
                    }, 10);
                }, 650);
            }
        },

        eventShowModal: function( button ) {
            var offset = g.width(),
                defaults = this.defaults,
                modal_name = button.data( 'modal' ),
                modal = $( '.modal--' + modal_name ),
                opened_modal = $( '.' + defaults.modal_cls );

            if ( modal.length > 0 && !modal.hasClass( defaults.modal_cls ) ) {
                if ( opened_modal.length > 0 ) {
                    this.modalClose( opened_modal, true );
                }

                this.body.addClass( defaults.body_cls );
                this.overlay.addClass( defaults.overlay_cls );

                modal.addClass( defaults.modal_cls );

                this.overlay.animate({
                    opacity: 1
                }, 650);

                this.animateTranslateX( modal, ( - offset ), 0 );
            }
        },

        eventCloseModal: function( button ) {
            var defaults = this.defaults,
                modal = button.parent();

            if ( modal.length > 0 && modal.hasClass( defaults.modal_cls ) ) {
                this.modalClose( modal );
            }
        }
    };

    $.modal = function() {
        return new Modal().init();
    };
}( jQuery, jQuery( window ) ));
