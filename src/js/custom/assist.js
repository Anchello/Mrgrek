(function() {
    var Assist = {
        isMobile: {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return ( Assist.isMobile.Android() || Assist.isMobile.BlackBerry() || Assist.isMobile.iOS() || Assist.isMobile.Opera() || Assist.isMobile.Windows() );
            }
        }
    };

    window.Assist = Assist;
}());
