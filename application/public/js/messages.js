const flashMessage = document.getElementById('flash-message');

const timeoutDuration = 5000; // 5 seconds

if (flashMessage) {
  const messageType = flashMessage.classList.contains('alert-success') ? 'success' : 'error';
  setTimeout(() => {
    flashMessage.parentNode.removeChild(flashMessage);
  }, timeoutDuration);
}
