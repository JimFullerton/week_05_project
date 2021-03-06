const PubSub = require('../helpers/pub_sub.js');

class AdminBusinessView{

  constructor (container) {
    this.container = container;
  }

  bindEvents() {
    PubSub.subscribe('Businesses:business-data-loaded', (evt) => {
      const businesses = evt.detail;
      console.log('In bus view, data retrieved: ', businesses);
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
    // prep business details:
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

    // prep edit/delete buttons:
    const editButton = document.createElement('button');
    editButton.classList.add('ui', 'blue', 'button');
    editButton.textContent = `update`;
    editButton.id = business.id
    editButton.addEventListener('click', (event) => {
      console.log(`edit button clicked: ${business.id}`);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('ui', 'red', 'button');
    deleteButton.textContent = `delete`;
    deleteButton.addEventListener('click', (event) => {
      console.log(`del button clicked: ${business.id}`);
      PubSub.publish('Admin:delete-business', business.id);
    });

    const buttons = document.createElement('div');
    buttons.classList.add('ui', 'buttons');
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    // create a holder and fill it with content & buttons:
    const content = document.createElement('div');
    content.classList.add("content");
    content.appendChild(header);
    content.appendChild(categoryInfo);
    content.appendChild(addressInfo);
    content.appendChild(contactInfo);
    content.appendChild(buttons);

    // create blank card and append the built content:
    const card = document.createElement('div');
    card.classList.add("card");
    card.appendChild(content);

    return card;
  }

}

module.exports = AdminBusinessView;
