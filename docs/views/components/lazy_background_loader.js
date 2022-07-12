"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interval = null;
function showImageIfOnScreen(imageLoadTracker, element) {
    var rect = element.getBoundingClientRect();
    var bufferSize = 200;
    var bg = element.getAttribute('data-lazybackground');
    if (bg && ((rect.top > -bufferSize &&
        rect.top < window.innerHeight + bufferSize) ||
        (rect.bottom > -bufferSize &&
            rect.bottom < window.innerHeight + bufferSize))) {
        element.style.backgroundImage = "url(\"" + bg + "\")";
        imageLoadTracker.setURLIsLoaded(bg);
        element.removeAttribute('data-lazybackground');
    }
}
function tryStartLazyBackgroundLoader(imageLoadTracker) {
    if (interval) {
        return;
    }
    interval = setInterval(function () {
        document.querySelectorAll('*[data-lazybackground]')
            .forEach(function (element) {
            showImageIfOnScreen(imageLoadTracker, element);
        });
    }, 100);
}
exports.default = tryStartLazyBackgroundLoader;
//# sourceMappingURL=lazy_background_loader.js.map