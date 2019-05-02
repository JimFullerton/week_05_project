var express = require('express');
var router = express.Router();
const SqlRunner = require("../db/sql_runner");

/* GET - read all data (including category name) for all businesses. */
router.get('/', function(req, res) {
  SqlRunner.run("SELECT businesses.id,category_id,organization,addressline1,addressline2,addressline3,phonenumber,url,category FROM businesses INNER JOIN business_categories ON businesses.category_id = business_categories.id")
    .then(result => {
        res.status(200).json(result.rows);
  });
});

/* GET - return all business categories. */
router.get('/categories', function(req, res) {
  SqlRunner.run("SELECT * FROM business_categories").then
    (result => {
      res.status(200).json(result.rows);
  });
});

/* GET - return all data for businesses in a given category. */
router.get('/:id', function(req, res) {
  SqlRunner.run("SELECT businesses.id,category_id,organization,addressline1,addressline2,addressline3,phonenumber,url,category FROM businesses INNER JOIN business_categories ON businesses.category_id = business_categories.id WHERE businesses.category_id = $1", [req.params.id]).then(
    result => {
      res.status(200).json(result.rows);
  });
});

/* POST - add a new category of business. INCOMPLETE */
router.post('/categories', function(req, res) {
  SqlRunner.run("INSERT INTO business_categories(category) VALUES ($1)", [req.body.category]).then
    (result => {
      SqlRunner.run("SELECT * FROM business_categories").then
        (result => {
          res.status(200).json(result.rows);
      });
  });
});

/* POST - add a new business. */
router.post('/', function(req, res) {
  SqlRunner.run(
    "INSERT INTO businesses(category_id,organization,addressLine1,addressLine2,addressLine3,phonenumber,url) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [req.body.category_id,req.body.organization,req.body.addressline1,req.body.addressline2,req.body.addressline3,req.body.phonenumber,req.body.url]
  ).then(results => {
    SqlRunner.run("SELECT * FROM businesses INNER JOIN business_categories ON businesses.category_id = business_categories.id").then(result => {
      res.status(201).json(result.rows);
    });
  });
});

/* DELETE - delete an existing business. */
router.delete('/:id', function(req, res) {
  SqlRunner.run("DELETE FROM businesses WHERE id = $1", [req.params.id]).then(
    result => {
      res.status(200).json(result);
  });
});

module.exports = router;
