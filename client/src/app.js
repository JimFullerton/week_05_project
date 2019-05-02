const BusinessView = require('./views/business_view.js');
const AdminBusinessView = require('./views/admin_business_view.js');
const Businesses = require('./models/businesses.js');
const CategoryView = require('./views/category_view.js');
const AdminCategoryView = require('./views/admin_category_view.js');
const Categories = require('./models/categories.js');

document.addEventListener('DOMContentLoaded', () => {

  const pageID = document.querySelector('p#page-id');

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

    const categoryContainer = document.querySelector('select#category-list');
    const adminCategoryView = new AdminCategoryView(categoryContainer);
    adminCategoryView.bindEvents();

    const filterContainer = document.querySelector('select#category');
    const filterView = new CategoryView(filterContainer);
    filterView.bindEvents();

  };

  const businesses = new Businesses();
  businesses.bindEvents();
  businesses.getData();

  const categories = new Categories();
  categories.getData();

});
