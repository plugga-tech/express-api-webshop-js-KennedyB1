var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
///////////////////
/*
router.get('/users', function (req, res, next) {
  req.app.locals.db.collection("users").find().toArray()
    .then(results => {
      const users = results.map(user => {
        console.log(user._id);
        return {
          name: user.name,
          email: user.email,
          id: user._id,
        };
      });
      res.send(users);
    })
    .catch(next);
});

*/



/*
router.post('/users', function (req, res, next) {
  const id = req.body.id;
  if (!id) {
    return res.status(400).send({ message: 'Missing ID parameter' });
  }

  req.app.locals.db.collection('users').findOne({ _id: new ObjectId(id) })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const userObject = {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      };

      res.send(userObject);
    })
    .catch(next);
});

*/

/*
/// Login
router.post('/users/login', function (req, res, next) {
  const { email, password } = req.body;

  req.app.locals.db.collection("users").findOne({ email, password })
    .then(user => {
      if (!user) {
        return res.status(401).send("Invalid email or password.");
      }

      console.log("User logged in:", user.name);
      res.send("Login successful.");
    })
    .catch(next);
});
//
*/







///////////////////// Lägg till 
/*
router.post("/users/add", function (req, res) {

  req.app.locals.db.collection("users").insertOne(req.body)
    .then(results => {
      // console.log(results);
      res.status(201).send(`User '${req.body.name}' är nu tilllagd! `);
    }).catch(error => {
      // console.log(error);
      res.status(500).send('Error');
    });


})
*/
/////////////////////////////////////////////////////////////////////


// Skriv ut alla produker///
/*
router.get('/products', function (req, res, next) {
  req.app.locals.db.collection("products").find().toArray()
    .then(results => {
      const products = results.map(product => {
        console.log(product);
        return {
          name: product.name,
          description: product.description,
          id: product._id,
          price: product.price,
          lager: product.lager,
        };
      });
      res.send(products);
    })
    .catch(next);
});

*/

///////////////////// Lägg till - produkter

/*
router.post("/products/add", function (req, res) {

  req.app.locals.db.collection("products").insertOne(req.body)
    .then(results => {
      // console.log(results);
      res.status(201).send(` '${req.body.name}' är nu tilllagd! `);
    }).catch(error => {
      // console.log(error);
      res.status(500).send('Error');
    });


})

*/


//// Hämta specefik produkt ///
/*
// const { ObjectIds } = require('mongodb');

router.post('/products', function (req, res, next) {
  const id = req.body.id;
  if (!id) {
    return res.status(400).send({ message: 'Missing ID parameter' });
  }

  req.app.locals.db.collection('products').findOne({ _id: new ObjectId(id) })
    .then(product => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }

      const productObject = {
        name: product.name,
        description: product.description,
        id: product._id,
        price: product.price,
        lager: product.lager,
      };

      res.send(productObject);
    })
    .catch(next);
});

*/
/////////////////

//////////
/*
router.post("/orders/add", function (req, res) {
  const { user, products } = req.body;

  // Check if user ID and products array are provided
  if (!user || !products) {
    return res.status(400).send({ message: 'Missing user or products data' });
  }

  // Create a new order object with user and products data
  const order = {
    user: user,
    products: products
  };

  // Insert the new order object into the database
  req.app.locals.db.collection("orders").insertOne(order)
    .then(results => {
      res.status(201).send(`Order for user '${user}' is now created!`);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error');
    });
});
*/


//////////////////

/*
router.get("/orders/all", function (req, res) {
  req.app.locals.db.collection("orders").find().toArray()
    .then(results => {
      const orders = results.map(order => {
        return {
          user: order.user,
          products: order.products,

        };
      });
      res.send(orders);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error');
    });
});

*/




module.exports = router;
