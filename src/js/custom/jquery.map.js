(function( $, g ) {
    var GMap = function() {
        this.map = $( '.map' );
    };

    GMap.prototype = {
        init: function() {
            var context = this,
                script = document.createElement('script'),
                api_key = 'AIzaSyC9Y6AtwNHYL36BNg6kfmqo4L6DgLOdLac';

            if ( this.map && this.map.length > 0 ) {
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key;

                script.addEventListener('load', function() {
                    context.build.call( context );
                });

                document.head.appendChild( script );
            }
        },

        build: function () {
            var Map, InfoBox, Marker, placemark,
                lat = parseFloat( this.map.data( 'lat' ) ),
                long = parseFloat( this.map.data( 'long' ) ),
                zoom = Number( this.map.data( 'zoom' ) ),
                address = this.map.data( 'address' ),
                grayscale = [
                    {
                        featureType: "all",
                        elementType: "all",
                        stylers: [
                            {
                                saturation: -100
                            }
                        ]
                    }
                ],
                options = {
                    center: {
                        lat: lat,
                        lng: long
                    },
                    styles: grayscale,
                    scrollwheel: false,
                    zoom: zoom
                };

            placemark = new google.maps.MarkerImage(
                'img/marker.png',
                new google.maps.Size(176, 178),
                new google.maps.Point(0, 0),
                new google.maps.Point(100, 180)
            );

            Map = new google.maps.Map( this.map.get( 0 ), options );

            Marker = new google.maps.Marker({
                position: {
                    lat: lat,
                    lng: long
                },
                map: Map,
                icon: placemark
            });

            InfoBox = new google.maps.InfoWindow({
                content: address
            });

            google.maps.event.addListener(Marker, 'click', function() {
                InfoBox.open(Map, Marker);
            });
        }
    };

    $.gmap = function() {
        return new GMap().init();
    };
}( jQuery, jQuery( window ) ));
