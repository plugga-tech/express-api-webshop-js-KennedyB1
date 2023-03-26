var express = require('express');
var router = express.Router();



router.post("/", function (req, res) {
    const { user, products } = req.body;


    // Create a new order object with user and products data
    const order = {
        user: user,
        products: products
    };

    // Insert the new order object into the database
    req.app.locals.db.collection("orders").insertOne(order)
        .then(results => {
            res.status(201).send(`Order is created! `);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error');
        });
});




module.exports = router;