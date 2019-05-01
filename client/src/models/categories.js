const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

class Categories{

  constructor () {
    this.data = null;
  }

  getData() {
    const url = `http://localhost:3000/businesses/categories`;
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {
        this.data = data;
        PubSub.publish('Categories:category-data-loaded', this.data);
      })
      .catch((message) => {
        console.error(message);
      });
  }

  // postCategory(category) {
  //   const url = `http://localhost:3000/businesses/categories`;
  //   const request = new RequestHelper(url);
  //   request.post(category)
  //     .then((category) => {
  //       PubSub.publish('Categories:category-data-loaded', categories);
  //     })
  //     .catch(console.error);
  // }

}

module.exports = Categories;
