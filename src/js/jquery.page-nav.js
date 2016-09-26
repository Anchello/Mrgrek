(function ( $ ) {
    $( document ).ready(function(){
        $(window).scroll(function() {
            var windowTop,
                link = $('.page-nav__link');

            windowTop = window.pageYOffset;

            link.each(function( i,elem ) {
                var target_top,
                    link_top,
                    current_button = $( '.page-nav__link--current'  );

                link_top = $(this).offset().top;
                target = $(this).attr( 'href' );
                target_top = $( target ).offset().top;

                if ( link_top > target_top) {
                    current_button.removeClass( 'page-nav__link--current' );
                    $(this).addClass( 'page-nav__link--current' );
                }

                if ( link_top > 903 && link_top < 2160 || link_top > 3170 && link_top < 4235 || link_top > 4970) {
                    $(this).addClass( 'link-black' );

                } else {
                    $(this).removeClass( 'link-black' );
                }
            });
        });
    })
}( jQuery, jQuery( window ) ));
