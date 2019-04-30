-- test queries for banff & macduff business Directory
-- for running through Postico

-- 1. return all data (inc cat name) for all businesses
SELECT * FROM businesses INNER JOIN business_categories
  ON businesses.category_id = business_categories.id

-- 2. return all data for businesses in a given category
-- *** parm: category
SELECT * FROM businesses INNER JOIN business_categories
  ON businesses.category_id = business_categories.id
    WHERE businesses.category_id = 1

-- 3. return all business categories
SELECT * FROM business_categories

-- 4. add a new category of business
-- *** parm: new cat
INSERT INTO business_categories(category) VALUES ('Charity Shop')

-- 5. add a new business
-- *** parm: new business details
INSERT INTO businesses(category_id,organization,addressLine1,addressLine2,addressLine3,phoneNumber,url)
VALUES (6,'CodeClan','Test Street','Banff','AB45 1ZZ','01261 123 123','http://www.codeclan.org')

INSERT INTO businesses(category_id,organization,addressLine1,addressLine2,addressLine3,phoneNumber,url)
VALUES (1,'Test Business','Test Street','Banff','AB45 2XY','01261 456 456','http://www.dummyurl.co.uk')

INSERT INTO businesses(category_id,organization,addressLine1,addressLine2,addressLine3,phoneNumber,url)
VALUES (4,'Test Restaurant','Test Avenue','Macduff','AB44 1XY','01261 789 789','http://www.website.com')

{
   "category_id": 5,
   "organization": "Double Checking",
   "addressline1": "200 Test Street",
   "addressline2": "Macduff",
   "addressline3": "AB44 1YY",
   "phonenumber": "01261 555 555",
   "url": "http://www.testurltwo.com"
}

-- 6. delete an existing business
-- *** parm: id to delete
DELETE FROM businesses WHERE id = 1

-- 7. update an existing business, given its id
-- *** parm: id & new data
UPDATE businesses SET
  category_id = 3,
  organization = 'Test Amendment',
  addressLine1 = '1 New Street',
  addressLine2 = 'New Town',
  addressLine3 = 'PC1 1PC',
  phoneNumber = '07777 123 123',
  url = 'http://www.newurl.com'
    WHERE id = 2
