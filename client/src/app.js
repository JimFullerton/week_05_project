const BusinessView = require('./views/business_view.js');
const Businesses = require('./models/businesses.js');
const CategoryView = require('./views/category_view.js');
const Categories = require('./models/categories.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Content loaded.');

  const businessContainer = document.querySelector('#business-container');
  const businessView = new BusinessView(businessContainer);
  businessView.bindEvents();

  const categoryContainer = document.querySelector('select#category');
  const categoryView = new CategoryView(categoryContainer);
  categoryView.bindEvents();

  const businesses = new Businesses();
  businesses.getData();

  const categories = new Categories();
  categories.getData();
});
