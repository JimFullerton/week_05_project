const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class Businesses{

  constructor () {
    this.data = null;
  }

  bindEvents() {
    PubSub.subscribe('CatView:category-filtered', (evt) => {
      const catID = evt.detail;
      this.getDataByCategory(catID);
    });
    PubSub.subscribe('Admin:delete-business', (evt) => {
      const busID = evt.detail;
      this.deleteBusiness(busID);
    });
  }

  getData() {
    const url = `http://localhost:3000/businesses`;
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {
        this.data = data;
        PubSub.publish('Businesses:business-data-loaded', this.data);
      })
      .catch((message) => {
        console.error(message);
      });
  }

  getDataByCategory(catID) {
    const url = `http://localhost:3000/businesses/${catID}`;
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {
        this.data = data;
        PubSub.publish('Businesses:business-data-loaded', this.data);
      })
      .catch((message) => {
        console.error(message);
      });
  }

  deleteBusiness(busID) {
    const url = `http://localhost:3000/businesses/${busID}`;
    const request = new RequestHelper(url);
    request.delete()
      .then((data) => {
        this.data = data;
        // PubSub.publish('Businesses:business-data-loaded', this.data);
      })
      .catch((message) => {
        console.error(message);
      });
  }

  // postBusiness(business) {
  //   const url = `http://localhost:3000/businesses`;
  //   const request = new RequestHelper(url);
  //   request.post(business)
  //     .then((business) => {
  //       PubSub.publish('Businesses:business-data-loaded', businesses);
  //     })
  //     .catch(console.error);
  // }

}

module.exports = Businesses;
