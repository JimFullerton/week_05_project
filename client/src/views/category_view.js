const PubSub = require('../helpers/pub_sub.js');
const Businesses = require('../models/businesses.js');

class CategoryView{

  constructor (container) {
    this.container = container;
  }

  bindEvents() {
    PubSub.subscribe('Categories:category-data-loaded', (evt) => {
      const categories = evt.detail;
      console.log('In cat view, cats retrieved: ', categories);
      this.render(categories);
      this.catSelection();
    });
  }

  render(categories) {
    this.clearCategories();

    const zeroOption = document.createElement('option');
    zeroOption.textContent = "Show All";
    zeroOption.value = 0;
    this.container.appendChild(zeroOption);

    categories.forEach((cat) => {
      const newOption = document.createElement('option');
      newOption.textContent = cat.category;
      newOption.value = cat.id;
      this.container.appendChild(newOption);
    });
  }

  clearCategories() {
    this.container.innerHTML = '';
  }

  catSelection() {
    console.log("in cat select");
    const catFilter = document.querySelector('select#category');
    catFilter.addEventListener('change', (evt) => {
      evt.preventDefault();
      if (evt.target.value == 0) {
        console.log("in cat filter evt - all:", evt.target.value);
        const businesses = new Businesses();
        businesses.bindEvents();
        businesses.getData();
      } else {
        console.log("in cat filter evt - option:", evt.target.value);
        PubSub.publish('CatView:category-filtered', evt.target.value);
      }
    });
  }

}

module.exports = CategoryView;
