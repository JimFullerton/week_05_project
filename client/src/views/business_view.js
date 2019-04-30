const PubSub = require('../helpers/pub_sub.js');

class BusinessView{

  constructor (container) {
    this.container = container;
  }

  bindEvents() {
    PubSub.subscribe('Businesses:business-data-loaded', (evt) => {
      console.log(evt.detail);
      const businesses = evt.detail;
      this.render(businesses);
    });
  }

  render(businesses) {
    this.clearBusinesses();

    businesses.forEach((business) => {
      const card = this.createCard(business);
      this.container.appendChild(card);
    });
  }

  clearBusinesses() {
    this.container.innerHTML = '';
  }

  createCard(business) {
    const categoryInfo = document.createElement('div');
    categoryInfo.classList.add('meta');
    categoryInfo.innerHTML = `<span>${business.category}</span>`;

    const addressInfo = document.createElement('div');
    addressInfo.classList.add('meta');
    addressInfo.innerHTML = `<span>Address: ${business.addressline1} | ${business.addressline2} | ${business.addressline3}</span>`;

    const contactInfo = document.createElement('div');
    contactInfo.classList.add('meta');
    contactInfo.innerHTML = `<span>Tel: ${business.phonenumber} | Web: ${business.url}</span>`;

    const header = document.createElement('div');
    header.classList.add("header");
    header.innerHTML = `${business.organization}`;

    const content = document.createElement('div');
    content.classList.add("content");

    const card = document.createElement('div');
    card.classList.add("ui");
    card.classList.add("card");

    content.appendChild(header);
    content.appendChild(categoryInfo);
    content.appendChild(addressInfo);
    content.appendChild(contactInfo);
    card.appendChild(content);

    return card;
  }

}

module.exports = BusinessView;
