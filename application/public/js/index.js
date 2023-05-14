// Get all thumbnail elements
const thumbnails = document.querySelectorAll('.thumbnail-overlay');

thumbnails.forEach(thumbnail => {
  // Get the corresponding video element
  const postId = thumbnail.id.split('-')[1];
  const video = document.getElementById(`video-${postId}`);

  thumbnail.addEventListener('mouseenter', () => {
    // Hide the thumbnail and show the video
    thumbnail.style.display = 'none';
    video.style.display = 'block';
    video.play();
  });

  thumbnail.addEventListener('mouseleave', () => {
    // Show the thumbnail and hide the video
    thumbnail.style.display = 'block';
    video.style.display = 'none';
    video.pause();
  });
});
