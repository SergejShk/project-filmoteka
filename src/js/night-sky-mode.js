const switchDayNight = document.querySelector('.switchCheckbox');

if (localStorage.getItem('darkMode') === null) {
  localStorage.setItem('darkMode', 'false');
}

checkDarkModeStatus();

function checkDarkModeStatus() {
  if (localStorage.getItem('darkMode') === 'true') {
    addDarkTheme();
    switchDayNight.checked = true;
  } else {
    removeDarkTheme();
    switchDayNight.checked = false;
  }
}

switchDayNight.addEventListener('click', () => {
  if (switchDayNight.checked) {
    addDarkTheme();
  } else {
    removeDarkTheme();
  }
  localStorage.setItem('darkMode', switchDayNight.checked);
});

function addDarkTheme() {
  document.body.classList.add('dark__theme', 'container-sky');
}

function removeDarkTheme() {
  document.body.classList.remove('dark__theme', 'container-sky');
}
