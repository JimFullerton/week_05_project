const PubSub = require('../helpers/pub_sub.js');

class CategoryView{

  constructor (container) {
    this.container = container;
  }

  bindEvents() {
    PubSub.subscribe('Categories:category-data-loaded', (evt) => {
      const categories = evt.detail;
      console.log('In cat view, cats retrieved: ', categories);
      this.render(categories);
    });
  }

  render(categories) {
    this.clearCategories();

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

}

module.exports = CategoryView;
