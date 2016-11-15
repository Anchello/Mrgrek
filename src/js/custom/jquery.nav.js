(function( $, g ) {
    var Nav = function() {
        this.body = $( 'body' );
        this.header = $( '.header' );
        this.nav = $( '.mobile-nav' );
        this.contact = $( '.mobile-nav__contact' );
        this.menu = $( '.mobile-menu' );
        this.hamburger = $( '.header__icon-menu' );
        this.close = $( '.mobile-menu__close' );
        this.scroll_button = $( '.scroll-to' );

        this.mob_next = $('.mobile-nav__next');
        this.mob_back = $('.mobile-nav__back');
        this.mob_list = $('.mobile-nav__list');
        this.mob_sublist = $('.mobile-nav__sublist');

        this.defaults = {
            scroll_top: g.scrollTop(),
            // current_scroll: 'page-nav__link--curent',
            display_cls: 'mobile-menu--display',
            show_cls: 'mobile-menu--show'
        };
    };

    Nav.prototype = {
        init: function() {
            var context = this,
                defaults = this.defaults;

            if ( this.header && this.header.length > 0 ) {

                if ( this.nav && this.nav.length > 0 ) {
                    g.on('resize', function() {
                        setTimeout(function() {
                            context.contactMove.call( context );
                        }, 100);
                    });
                }

                this.hamburger.on('click', function( e ) {
                    context.eventShowMenu.call( context );

                    e.preventDefault();

                    context.contactMove.call( context );

                    return false;
                });

                this.close.on('click', function( e ) {
                    context.eventCloseMenu.call( context );

                    e.preventDefault();

                    context.contactMove.call( context );

                    return false;
                });

                this.mob_next.on('click', function( e ) {
                    context.sublistShow.call( context, $( this ) );

                    e.preventDefault();

                    setTimeout(function() {
                        context.contactMove.call( context );
                    }, 300);
                });

                this.mob_back.on('click', function(e) {
                    context.sublistHide.call( context, $( this ) );

                    setTimeout(function() {
                        context.contactMove.call( context );
                    }, 500);

                    e.preventDefault();
                });
            }

            if ( this.scroll_button.length > 0 ) {

                this.scroll_button.on('click', function( e ) {
                    context.eventScrollTo.call( context, this, e );

                    e.preventDefault();

                    return false;
                });
            }
        },

        scrollTo: function( target ) {
            var body = $( 'html, body' ),
                target = $( target );


            if ( target.length > 0 ) {
                body.animate({
                    scrollTop: $( target ).offset().top
                }, 600);
            }
        },

        eventShowMenu: function() {
            var context = this;

            context.menu.slideDown(300);
            context.body.addClass( 'page--overlay' );

            context.hamburger.fadeOut();
            context.close.fadeIn();
        },

        eventCloseMenu: function() {
            var context = this,
                defaults = this.defaults;

            context.menu.slideUp(300);
            this.body.removeClass( 'page--overlay' );

            context.hamburger.fadeIn();
            context.close.fadeOut();
        },

        sublistShow: function( mob_next ) {
            var context = this,
                slider_id = mob_next.data( 'sublist' ),
                sublist_item = $( '.mobile-nav__sublist--' + slider_id );

            sublist_item.slideDown(300);

            context.mob_list.slideUp(300);
        },

        sublistHide: function( mob_next ) {
            var context = this;

            context.mob_sublist.slideUp(300);

            context.mob_list.slideDown(300);
        },


        contactMove: function() {
            var screen_height = g.height(),
                nav_height = this.nav.outerHeight(),
                header_height = this.header.outerHeight(),
                sublist_height = this.mob_sublist.outerHeight(),
                contact_height = this.contact.outerHeight();

            if  ( nav_height > ( screen_height -  header_height - contact_height) ) {
                this.contact.css( 'bottom' , (screen_height - nav_height - header_height - contact_height)  );
            } else {
                this.contact.css( 'bottom' , '0');
            }
        },

        eventScrollTo: function( button, e ) {
            var page,
                button = $( button ),
                target = button.attr( 'href' ),
                base = $( 'base' ).attr( 'href' ),
                current_page = location.pathname;

            if ( target.substr( 0, 1 ) !== '#' ) {
                base = base.substr( base.indexOf( '/', 10 ) );
                page = base + target.substr( 0, target.lastIndexOf( '/' ) + 1 );

                if ( page !== current_page ) {
                    location.replace( base + target );
                } else {
                    target = target.substr( target.lastIndexOf( '/' ) + 1 );

                    this.scrollTo( target );
                }
            } else {
                this.scrollTo( target );
            }

            e.preventDefault();

            return false;
        }

    };

    $.nav = function() {
        return new Nav().init();
    };
}( jQuery, jQuery( window ) ));

