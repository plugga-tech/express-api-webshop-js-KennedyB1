var express = require('express');
var router = express.Router();


/**/
router.post("/", function (req, res) {
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
            res.status(201).send(`Order for user '${user}' is now created! `);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error');
        });
});
//




module.exports = router;