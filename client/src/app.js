const BusinessView = require('./views/business_view.js');
const Businesses = require('./models/businesses.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Content loaded.');
  
  const businessContainer = document.querySelector('#business-container');
  const businessView = new BusinessView(businessContainer);
  businessView.bindEvents();

  const businesses = new Businesses();
  businesses.getData();
});
