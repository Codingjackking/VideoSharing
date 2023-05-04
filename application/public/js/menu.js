/* Hamburger Menu */
function hamburgerMenu() {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  hamburger.classList.toggle('change');
  sidebar.classList.toggle('active');
}

function iconMenu() {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const avatarCircle = document.querySelector('.avatar-circle');

  let isMenuVisible = false;

  avatarCircle.addEventListener('click', () => {
    if (isMenuVisible) {
      dropdownMenu.style.display = 'none';
    } else {
      dropdownMenu.style.display = 'grid';
      ;
    }
    isMenuVisible = !isMenuVisible;
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.avatar-circle') && isMenuVisible) {
      dropdownMenu.style.display = 'none';
      isMenuVisible = false;
    }
  });
}



