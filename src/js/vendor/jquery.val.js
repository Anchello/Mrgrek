(function ($) {
    $(document).ready(function () {

        $('.validate').validate({
            rules: {
                level: {
                    required: true
                }
            }
            });
    })
} ( jQuery ));
