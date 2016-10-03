(function ($) {
    $(document).ready(function(){

        if ($(window).width() <= '400') {
            $( '.jRating' ).jRating({
                step : true,
                rateMax: 10,
                type : 'small',
                length : 10
            });
        } else {
            $( '.jRating' ).jRating({
                step : true,
                rateMax: 10,
                type : 'big',
                length : 10
            });
        };

        var tel = $( 'input[type="tel"]' );
        if ( tel && tel.length > 0 ) {
            tel.inputmask("+7 (999) 999-99-99");
        }
    });

} ( jQuery ));