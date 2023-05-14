const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach(container => {
  const video = container.querySelector('video');
  const overlay = container.querySelector('.video-overlay');
  const videoSrc = overlay.getAttribute('data-src');

  overlay.addEventListener('mouseenter', () => {
    video.src = videoSrc;
    video.play();
  });

  overlay.addEventListener('mouseleave', () => {
    video.pause();
  });
});
