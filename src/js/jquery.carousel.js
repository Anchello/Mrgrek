(function( $, g ) {
    var Carousel = function() {
        this.news = $( '.news-section' );
        this.carousel = $( '.news-carousel' );
        this.items = $( '.news-carousel__item' );
        // this.items = el;
        // this.nav = $( '.carousel-nav' );
        this.prev_button =  $( '.news-carousel__btn--prev' );
        this.next_button = $( '.news-carousel__btn--next' );
        this.indexes = {
            current: 0,
            count: this.items.length,
            next: 0,
            prev: 0
        };

        this.defaults = {
            current_cls: 'news-carousel__item--current'
        };
    };

    Carousel.prototype = {
        init: function() {
            var context = this;

            if ( this.news && this.news.length > 0 ) {
                this.indexes.current = 1;

                this.indexize();

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

                this.prev_button.on('click', function( e ) {
                    context.eventPrevSlide.call( context );

                    e.preventDefault();

                    return false;
                });

                this.next_button.on('click', function( e ) {
                    context.eventNextSlide.call( context );

                    e.preventDefault();

                    return false;
                });

                if ( Assist.isMobile.any() ) {
                    this.news.hammer({
                        direction: Hammer.DIRECTION_HORIZONTAL
                    }).on('swipe', function() {
                        context.eventSwipe.call( context );
                    });
                }
            }
        },

        render: function() {
            var item_height = this.items.outerHeight ();

            this.items.css( 'position', 'absolute' );

            this.carousel.css( 'height', item_height );

            this.reOrder();
        },

        indexize: function() {
            if ( this.indexes.current === 0 ) {
                this.indexes.prev = this.indexes.count - 1;
                this.indexes.next = this.indexes.current + 1;
            } else if ( this.indexes.current === this.indexes.count - 1 ) {
                this.indexes.prev = this.indexes.count - 2;
                this.indexes.next = 0;
            } else {
                this.indexes.prev = this.indexes.current - 1;
                this.indexes.next = this.indexes.current + 1;
            }
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

        reOrder: function() {
            var context = this,
                offset = g.width(),
                item_width = this.items.outerWidth();

            this.items.each(function( index, item ) {
                item = $( item );

                if ( index === context.indexes.current ) {
                    context.setTranslateX( item, item_width );
                    item.addClass(context.defaults.current_cls);
                } else if ( index === context.indexes.prev ) {
                    context.setTranslateX( item, 0 );
                // } else if ( index === context.indexes.next ) {
                //     context.setTranslateX( item, ( offset * 2 ) );
                } else if ( index > context.indexes.current ) {
                    context.setTranslateX( item, ( offset * 2 ) );
                } else if ( index < context.indexes.prev ) {
                    context.setTranslateX( item, ( - offset ) );
                }
            });
        },

        toRight: function () {
            var context = this,
                offset = g.width(),
                item_width = this.items.outerWidth(),
                current = $( this.items[ this.indexes.current ] ),
                prev = $( this.items[ this.indexes.prev ] ),
                // old_next = $( this.items[ this.indexes.next + 1 ] ),
                next = $( this.items[ this.indexes.next ] );

            if ( this.indexes.current === this.indexes.count - 1 ) {
                this.items.each(function( index, item ) {
                    item = $( item );

                    if ( index > context.indexes.next ) {
                        context.setTranslateX( item, ( - offset ) );
                    }
                });
            }

            // if ( old_next && old_next.length > 0 ) {
            //     this.animateTranslateX( old_next, ( offset * 2 ), ( offset * 2 ) );
            // }
            //
            // if ( context.indexes.current === this.indexes.count - 2 ) {
            //     old_next = $( this.items[ 0 ] );
            //
            //     this.animateTranslateX( old_next, ( offset * 2 ), ( offset * 2 ) );
            // }

            this.animateTranslateX( current, 0, item_width );
            current.addClass(this.defaults.current_cls);
            this.animateTranslateX( prev, ( - offset ), 0 );
            this.animateTranslateX( next, item_width, ( offset * 2 ) );
            next.removeClass(this.defaults.current_cls);
        },

        toLeft: function () {
            var context = this,
                offset = g.width(),
                item_width = this.items.outerWidth(),
                current = $( this.items[ this.indexes.current ] ),
                prev = $( this.items[ this.indexes.prev ] ),
                old_prev = $( this.items[ this.indexes.prev - 1 ] );
                // next = $( this.items[ this.indexes.next ] );

            if ( this.indexes.current === this.indexes.count - 1 ) {
                this.items.each(function( index, item ) {
                    item = $( item );

                    if ( index < context.indexes.prev ) {
                        context.setTranslateX( item, ( offset * 2 ) );
                    }
                });
            }

            if ( old_prev && old_prev.length > 0 ) {
                this.animateTranslateX( old_prev, 0, ( - offset ) );
            }

            if ( context.indexes.current === 1 ) {
                old_prev = $( this.items[ this.indexes.count - 1 ] );

                this.animateTranslateX( old_prev, 0, ( - offset ) );
            }

            this.animateTranslateX( current, ( offset * 2 ), item_width );
            current.addClass(this.defaults.current_cls);
            this.animateTranslateX( prev, item_width, 0 );
            prev.removeClass(this.defaults.current_cls);
            // this.animateTranslateX( next, ( offset * 2 ), ( offset * 2 ) );
        },

        eventPrevSlide: function() {
            this.indexes.current = this.indexes.prev;

            this.indexize();
            this.toRight();
        },

        eventNextSlide: function() {
            this.indexes.current = this.indexes.next;

            this.indexize();
            this.toLeft();
        },

        eventSwipe: function() {
            var data = this.news.data( 'hammer' ),
                direction = data.session.lastInterval.direction,
                menu_called = data.session.offsetDelta.x > g.width() - 30,
                menu = $( '.mobile-menu' );

            if ( !menu_called && direction === 2 && !menu.hasClass( 'mobile-menu--display' ) ) {
                this.indexes.current = this.indexes.next;

                this.indexize();
                this.toLeft();
            } else if ( direction === 4 && !menu.hasClass( 'mobile-menu--display' ) ) {
                this.indexes.current = this.indexes.prev;

                this.indexize();
                this.toRight();
            }
        }
    };

    $.carousel = function() {
        return new Carousel().init();
    };
}( jQuery, jQuery( window ) ));
