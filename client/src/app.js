const BusinessView = require('./views/business_view.js');
const AdminBusinessView = require('./views/admin_business_view.js');
const Businesses = require('./models/businesses.js');
const CategoryView = require('./views/category_view.js');
const AdminCategoryView = require('./views/admin_category_view.js');
const Categories = require('./models/categories.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Content loaded.'); // ***** log to be removed when no longer required *****

  const pageID = document.querySelector('p#page-id');
  console.log("Page ID: ", pageID.textContent); // ***** log to be removed when no longer required *****

  if (pageID.textContent == 'index') {

    const businessContainer = document.querySelector('#business-container');
    const businessView = new BusinessView(businessContainer);
    businessView.bindEvents();

    const categoryContainer = document.querySelector('select#category');
    const categoryView = new CategoryView(categoryContainer);
    categoryView.bindEvents();

  } else {

    const businessContainer = document.querySelector('#business-container');
    const adminBusinessView = new AdminBusinessView(businessContainer);
    adminBusinessView.bindEvents();

    const categoryContainer = document.querySelector('select#category');
    const adminCategoryView = new AdminCategoryView(categoryContainer);
    adminCategoryView.bindEvents();

  };

  const businesses = new Businesses();
  businesses.bindEvents();
  businesses.getData();

  const categories = new Categories();
  categories.getData();

});
