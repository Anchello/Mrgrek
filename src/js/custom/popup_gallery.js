document.addEventListener('DOMContentLoaded', function() {
    var galleryButtonsList = document.querySelectorAll('.gallery__article');
    var galleryButtons = Array.prototype.slice.call(galleryButtonsList);

    galleryButtons.forEach(function(button) {
        button.onclick = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = {index: link, event: event},
                links = this.getElementsByTagName('a');
            blueimp.Gallery(links, options);
        }
    });
});

