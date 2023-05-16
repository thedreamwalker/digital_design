import setPopup from './popup.js';

const catalog = async () => {
  const getData = async (url) =>  await (await fetch(url)).json();
  const allPlants = await getData('./js/plants.json');
  const allCategory = [];

  const setCategory = () => {

    allPlants.forEach(plant => {
      if (allCategory.indexOf(plant.category) < 0) {
        allCategory.push(plant.category);
      }
    });
  }

  class Plants {
    constructor (img, name, category, date, parent) {
      this.img = img,
      this.name = name,
      this.category = category,
      this.date = date,
      this.parent = parent
    }

    render() {
      const element = document.createElement('li');
      element.classList.add('catalog-item');

      const img = document.createElement('div');
      img.classList.add('catalog-item__img');
      img.innerHTML = `<img src="${this.img}" alt="${this.name}">`;
      element.append(img);

      const info = document.createElement('div');
      info.classList.add('catalog-item__info');

      const text = document.createElement('div');
      text.classList.add('catalog-item__text');
      text.innerHTML = `<div class="catalog-item__name">
        ${this.name}
        </div>
        <div class="catalog-item__date">
        ${this.date}
        </div>`;

        const buttonBuy = document.createElement('button');
        buttonBuy.classList.add('catalog-item__button', 'button');
        buttonBuy.textContent = 'Buy';
        buttonBuy.addEventListener('click', () => setPopup(this.img, this.name, 'new'));

        info.append(text);
        info.append(buttonBuy);
        element.append(info);

      this.parent.append(element);
    }
  }

  const setCatalog = () => {
    const catalog = document.querySelector('.catalog');
    const container = catalog.querySelector('.container');
    const obj = {};

    allCategory.forEach(category => {
      
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      div.classList.add('category__wrapper');
      h2.classList.add('title');
      h2.textContent = category;
      const ul = document.createElement('ul');
      ul.classList.add('catalog-list');
      div.append(h2);
      div.append(ul);
      container.append(div);

      obj[category] = ul;
    });

    allPlants.forEach(({ img, name, category, date }) => {

      new Plants (img, name, category, date, obj[category]).render();
    });
  };

  setCategory();
  setCatalog();
};

export default catalog;