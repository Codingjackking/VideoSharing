const avatarCircle = document.querySelector('.avatar-circle');
const dropdownMenu = document.querySelector('.dropdown-menu');

avatarCircle.addEventListener('click', () => {
  dropdownMenu.classList.toggle('dropdown-menu--visible');
});
