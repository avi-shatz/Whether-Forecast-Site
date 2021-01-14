const Product = require('../models/product');

// this model stores the products in a regular file - this is for DEMONSTRATION PURPOSE!
// to avoid using a database. In this course you must USE a database to store data.

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  let prods = Product.fetchAll();
  res.render('shop', {
    prods: prods,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: prods.length > 0
  });

};
