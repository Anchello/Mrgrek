(function ( $ ) {
    $( document ).ready(function(){
        var dropdown = $( '.header-nav__item--more' ),
            arrow = $( '.header-nav__item--more .icon--arrow' ),
            list = '.header-nav__list--sub';

            mob_next = $('.mobile-nav__link--more'),
            mob_back = $('.mobile-nav__subitem--back'),
            mob_list = $('.mobile-nav__list'),
            mob_sublist = $('.mobile-nav__sublist');

        dropdown.hover(function () {
            clearTimeout( $.data( this,'timer' ) );

            $( list,this ).stop( true,true ).slideDown(300);

            arrow.css( 'transform','rotate(180deg)' );
        }, function () {
            $.data( this,'timer', setTimeout( $.proxy(function() {
                $( list,this ).stop( true,true ).slideUp(300);

                arrow.css( 'transform','rotate(0deg)' );
            }, this), 100));
        });
    })
}( jQuery, jQuery( window ) ));
