const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class Businesses{

  constructor () {
    this.data = null;
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

  postBusiness(business) {
    const url = `http://localhost:3000/businesses`;
    const request = new RequestHelper(url);
    request.post(business)
      .then((business) => {
        PubSub.publish('Businesses:business-data-loaded', businesses);
      })
      .catch(console.error);
  }

}

module.exports = Businesses;
