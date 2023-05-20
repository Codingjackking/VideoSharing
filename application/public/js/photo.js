console.log('Script loaded');

fetch('https://jsonplaceholder.typicode.com/albums/2/photos')
  .then(response => response.json())
  .then(photos => {
    const photoGallery = document.getElementById('photo-gallery');

    photos.forEach(photo => {
      const photoContainer = document.createElement('div');
      photoContainer.classList.add('photo-container');

      const photoElement = document.createElement('img');
      photoElement.classList.add('photo');
      photoElement.src = photo.url;

      const titleElement = document.createElement('div');
      titleElement.classList.add('title');
      titleElement.innerText = photo.title;

      photoContainer.appendChild(photoElement);
      photoContainer.appendChild(titleElement);
      photoGallery.appendChild(photoContainer);

      photoContainer.addEventListener('click', () => {
        photoContainer.style.transition = 'opacity 1s ease-out';
        photoContainer.style.opacity = 0;

        setTimeout(() => {
          photoGallery.removeChild(photoContainer);
          photoCountElement.innerText = parseInt(photoCountElement.innerText) - 1;
        }, 1000);
      });
    });

    const photoCountElement = document.getElementById('photo-count');
    photoCountElement.innerText = photos.length;
  })
  .catch(error => console.error(error));

