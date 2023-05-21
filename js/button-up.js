const setButtonUp = () => {
  const button = document.createElement('button');
  button.classList.add('button-up');
  const span = document.createElement('span');
  button.append(span);
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  })
  document.body.append(button);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  })
}

export default setButtonUp;