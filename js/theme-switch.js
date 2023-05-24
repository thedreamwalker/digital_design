const themeSwitch = () => {
  const button = document.querySelector('.theme-switcher__button');
  let theme = 'light';

  button.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    if (theme === 'light') {
      theme = 'dark';
    } else {
      theme = 'light';
    }
    console.log(theme);
  });

  const setTheme = (color) => {
    if (color === 'dark') {
      document.body.classList.add('theme-dark');
    }
  };

  function setLocalStorage() {
    localStorage.setItem('theme', theme);
  }

  function getLocalStorage() {
    if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme');
      setTheme(theme);
    }
  }

  window.addEventListener('beforeunload', setLocalStorage);
  window.addEventListener('load', getLocalStorage);
}

export default themeSwitch;