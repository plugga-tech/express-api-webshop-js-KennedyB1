const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');


router.post('/', async function (req, res, next) {
    console.log(req.body)

    const { products } = req.body;

    for (const prod of products) {
        const foundProduct = await req.app.locals.db.collection('products').findOneAndUpdate(
            { id: new ObjectId(prod.productId) },
            { $inc: { lager: -prod.quantity } },
            { returnOriginal: false }
        );
        if (!foundProduct.value) {
            // product with the given id does not exist
            return res.status(404).send(`Product with id ${prod.productId} does not exist`);
        }
        console.log(`Updated product ${foundProduct.value._id}: lager = ${foundProduct.value.lager}`);
    };

    req.app.locals.db.collection('orders').insertOne(req.body)
        .then(result => {
            console.log("New order added")
            res.status(200).json(result)
        })
});



// HÄMTA ALLA ORDERS
router.get("/all", function (req, res) {
    req.app.locals.db.collection("orders").find().toArray()
        .then(orders => {
            res.send(orders);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Felmeddelande!");
        });
});


module.exports = router;