var express = require('express');
var router = express.Router();



router.post("/", function (req, res) {
    const { user, products } = req.body;

    const order = {
        user: user,
        products: products
    };

    req.app.locals.db.collection("orders").insertOne(order)
        .then(results => {
            res.status(201).send(`Order skapad! `);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error');
        });
});




module.exports = router;