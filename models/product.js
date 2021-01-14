const fs = require('fs');
const path = require('path');


module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    productList.push(this);
  }

  static fetchAll() {
    return (productList);
  }
};

/*
 this example stores the model in memory. Ideally these should be stored
 persistently in a database.
 */
var productList = [];

