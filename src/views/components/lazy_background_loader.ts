import ImageLoadTracker from './image_load_tracker';

let interval: NodeJS.Timer | null = null;

function showImageIfOnScreen(imageLoadTracker: ImageLoadTracker, element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const bufferSize = 200;
  const bg = element.getAttribute('data-lazybackground');
  if (bg && (
    (rect.top > -bufferSize &&
      rect.top < window.innerHeight + bufferSize) ||
    (rect.bottom > -bufferSize &&
      rect.bottom < window.innerHeight + bufferSize))) {
    element.style.backgroundImage = `url("${bg}")`;
    imageLoadTracker.setURLIsLoaded(bg);
    element.removeAttribute('data-lazybackground');
  }
}

export default function tryStartLazyBackgroundLoader(imageLoadTracker: ImageLoadTracker) {
  if (interval) {
    return;
  }
  interval = setInterval(() => {
    document.querySelectorAll<HTMLElement>('*[data-lazybackground]')
        .forEach((element) => {
          showImageIfOnScreen(imageLoadTracker, element);
        });
  }, 100);
}
