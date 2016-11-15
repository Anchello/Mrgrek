(function ( $ ) {
    $( document ).ready(function(){
        var dropdown = $( '.header-nav__item--more' ),
            arrow = $( '.header-nav__link .icon--arrow' ),
            list = '.header-nav__sublist';

        dropdown.hover(function () {
            clearTimeout( $.data( this,'timer' ) );

            $( list,this ).stop( true,true ).slideDown(300);

            $(this).find( arrow ).css( 'transform','rotate(180deg)' );
        }, function () {
            $.data( this,'timer', setTimeout( $.proxy(function() {
                $( list,this ).stop( true,true ).slideUp(300);

                $(this).find( arrow ).css( 'transform','rotate(0deg)' );
            }, this), 100));
        });
    })
}( jQuery, jQuery( window ) ));
