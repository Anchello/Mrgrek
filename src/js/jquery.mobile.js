(function( $, g ) {
    var Mobile = function() {
        this.header = $( '.header' );
        this.nav = $( '.mobile-nav' );
        this.contact = $( '.mobile-nav__contact' );
        this.menu = $( '.mobile-menu' );
        this.mob_next = $('.mobile-nav__link--more');
        this.mob_back = $('.mobile-nav__subitem--back');
        this.mob_list = $('.mobile-nav__list');
        this.mob_sublist = $('.mobile-nav__sublist');
    };

    Mobile.prototype = {
        init: function() {
            var context = this;

            if ( this.header && this.header.length > 0 ) {

                this.mob_next.on('click', function( e ) {
                    context.sublistShow.call( context );

                    e.preventDefault();

                    setTimeout(function() {
                        context.contactMove.call( context );
                    }, 300);
                });

                this.mob_back.on('click', function(e) {
                    context.sublistHide.call( context );

                    e.preventDefault();

                    setTimeout(function() {
                        context.contactBack.call( context );
                    }, 300);
                });
            }
        },

        sublistShow: function() {
            var context = this;

            context.mob_sublist.slideDown(300);
            context.mob_list.slideUp(300);
        },

        sublistHide: function() {
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

            if ( screen_height < 767 ) {
                if  ( nav_height > ( screen_height -  header_height - contact_height) ) {
                    this.contact.css( 'bottom' , (screen_height - sublist_height - header_height - contact_height)  );
                }
            }
        },

        contactBack: function() {
            var screen_height = g.height();

            if ( screen_height < 767 ) {
                this.contact.css( 'bottom' , 0 );
            }
        }
    };

    $.mobile = function() {
        return new Mobile().init();
    };
}( jQuery, jQuery( window ) ));