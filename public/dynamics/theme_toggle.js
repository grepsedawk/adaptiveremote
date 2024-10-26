// theme_toggle.js
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  if (body.dataset.theme === 'dark') {
    body.dataset.theme = 'light';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.dataset.theme = 'dark';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});
