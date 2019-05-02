const PubSub = require('../helpers/pub_sub.js');

class AddFormView{

  constructor (container) {
    this.container = container;
  }

  bindEvents() {
    PubSub.subscribe('Categories:category-data-loaded', (evt) => {
      const categories = evt.detail;
      console.log('*** Recd cat ready signal.');
      this.standBy();
    });
  }

  standBy() {
    console.log('*** prepping standby func.');
    this.container.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(`button click, : ${evt.target['organization'].value}`);
      const formData = {};
      formData.category_id = evt.target['category-list'].value
      formData.organization = evt.target['organization'].value
      formData.addressLine1 = evt.target['addressline1'].value
      formData.addressLine2 = evt.target['addressline2'].value
      formData.addressLine3 = evt.target['addressline3'].value
      formData.phonenumber = evt.target['phonenumber'].value
      formData.url = evt.target['url'].value
      console.log(formData);
      PubSub.publish('AddForm:add-business', formData);
    });
  }

  // render(categories) {
  //   this.clearCategories();
  //
  //   const zeroOption = document.createElement('option');
  //   zeroOption.textContent = "";
  //   zeroOption.value = 0;
  //   this.container.appendChild(zeroOption);
  //
  //   categories.forEach((cat) => {
  //     const newOption = document.createElement('option');
  //     newOption.textContent = cat.category;
  //     newOption.value = cat.id;
  //     this.container.appendChild(newOption);
  //   });
  // }
  //
  // clearCategories() {
  //   this.container.innerHTML = '';
  // }


}

module.exports = AddFormView;
