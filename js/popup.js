const setPopup = (productImg, productName, type, oldPopup, oldOverlay) => {
  const popup = oldPopup || document.createElement('div');
  const overlay = oldOverlay || document.querySelector('.overlay');

  const closePopup = () => {
    if (popup.querySelector('textarea')) {
      popup.querySelector('textarea').removeEventListener('input', changeCounter);
    }
    if (popup.querySelector('form')) {
      popup.querySelector('form').removeEventListener('submit', submitOrder);
    }
    
    popup.classList.add('hide');
      
    popup.addEventListener('animationend', () => {
      popup.querySelectorAll('.button').forEach(elem => elem.removeEventListener('click', closePopup));
      popup.classList.remove('active');
      popup.remove();
    }, {once: true})
  
    overlay.classList.remove('active');
    overlay.removeEventListener('click', closePopup);
  }

  if (type === 'new') {
    popup.classList.add('popup', 'active');
    overlay.classList.add('active');
    overlay.addEventListener('click', closePopup);
    document.body.append(popup);
  } else if (type === 'done') {
    popup.innerHTML = '';
  }

  const submitOrder = (event, form, textarea, img, name, type, popup, overlay) => {
    event.preventDefault();
    form.removeEventListener('submit', submitOrder);
    textarea.removeEventListener('input', changeCounter);
    setPopup(img, name, type, popup, overlay);
  }

  const changeCounter = (span, value) => {
      span.textContent = `${2000 - value.length}`;
    }


  class Popup {
    constructor (productImg, productName, type) {
      this.name = productName,
      this.img = productImg,
      this.type = type
    }
  
    render() {
      popup.innerHTML = '';

      const img = this.type === 'new' ? '<img src="./assets/svg/icon_plant.svg" width="83" height="85">' : '<img src="./assets/svg/icon_letter.svg" width="65" height="80">';
      const text = this.type === 'new' ? 'Check the order details' : 'Your order has been received';

      const header = document.createElement('div');
      header.classList.add('popup__header');
      header.innerHTML = `
      <div class="popup__icon">
          ${img}
        </div>
        <p>${text}</p>`;

      popup.append(header);

      const buttons = document.createElement('div');
      buttons.classList.add('popup__buttons');

      const buttonClose = document.createElement('button');
      buttonClose.classList.add('button');
      buttonClose.setAttribute('type', 'button');
      buttonClose.textContent = 'Close';
      buttonClose.addEventListener('click', closePopup);

      if (type === 'new') {

        const form = document.createElement('form');
        form.classList.add('form');
        form.setAttribute('action', '#');
        form.setAttribute('method', 'POST');
        form.innerHTML = `<h4>Order Details</h4>
          <ul class="product-legend">
            <li class="product-legend__name">Product</li>
            <li class="product-legend__name">Qty</li>
            <li class="product-legend__name">Color</li>
          </ul>
          <div class="product-info">
            <div class="product-img"><img src="${this.img}"></div>
            <h3 class="product-name">${this.name}</h3>
            <input class="product-count" type="number" min="1" max="500" value="1" required>
            <fieldset class="product-color">
              <ul class="product-color__list">
                <li class="product-color__item">
                  <input type="radio" id="colorWhite" name="color" value="White">
                  <label for="colorWhite">
                    <span class="product-color__button"></span>
                  </label>
                </li>
                <li class="product-color__item">
                  <input type="radio" id="colorRed" name="color" value="Red">
                  <label for="colorRed">
                    <span class="product-color__button"></span>
                  </label>
                </li>
                <li class="product-color__item">
                  <input type="radio" id="colorBlack" name="color" value="Black" checked>
                  <label for="colorBlack">
                    <span class="product-color__button"></span>
                  </label>
                </li>
                <li class="product-color__item">
                  <input type="radio" id="colorBlue" name="color" value="Blue">
                  <label for="colorBlue">
                    <span class="product-color__button"></span>
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>`;

          const comment = document.createElement('div');
          comment.classList.add('popup__comment');
          const span = document.createElement('span');
          span.textContent = '2000';
          comment.append(span);
          const textarea = document.createElement('textarea');
          textarea.setAttribute('name', 'comment');
          textarea.setAttribute('id', 'comment');
          textarea.setAttribute('maxlength', '2000');
          textarea.setAttribute('placeholder', 'Если необходимо, впишите дополнительную информацию');
          textarea.addEventListener('input', () => changeCounter(span, textarea.value));
          comment.append(textarea);
          form.append(comment);

          form.addEventListener('submit', (event) => submitOrder(event, form, textarea, this.img, this.name, 'done', popup, overlay));

          const buttonOrder = document.createElement('button');
          buttonOrder.classList.add('button');
          buttonOrder.setAttribute('type', 'submit');
          buttonOrder.textContent = 'Place order';

          buttons.append(buttonOrder);
          buttons.append(buttonClose);
          form.append(buttons);
          popup.append(form);
      } else if (type === 'done') {
        const body = document.createElement('div');
        body.classList.add('popup__body');
        body.innerHTML = `<p>Your order is currently being processed. You will receive an order confirmation email shortly with the expected delivery date for your items.</p>`;
        popup.append(body);
        buttons.append(buttonClose);
        popup.append(buttons);
      }
    }
  }

  new Popup(productImg, productName, type).render();
}

export default setPopup;