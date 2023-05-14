var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

// All
router.get('/', function (req, res, next) {
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


router.get('/:productId', function (req, res, next) {
    const productId = req.params.productId;
    console.log(productId);

    req.app.locals.db.collection("products").findOne({ "id": new ObjectId(productId) })
        .then(result => {
            if (result == null) {
                res.status(404).json("Can't find products with ID " + productId)
            } else {
                const productObject = {
                    name: result.name,
                    description: result.description,
                    id: productId,
                    price: result.price,
                    lager: result.lager,
                };
                res.status(200).json(productObject);
            }
        })
        .catch(next);
});


router.post('/', function (req, res, next) {
    const id = req.body.id;
    if (!id) {
        return res.status(400).send({ message: 'Missing ID parameter' });
    }

    const productObject = {
        id: new ObjectId(id),
        name: 'Produkt 2',
        description: 'Beskrivning av produkt 2',
        price: 10,
        lager: 15,
    };

    req.app.locals.db.collection('products').findOne({ id: productObject.id })
        .then(existingProduct => {
            if (existingProduct) {
                return req.app.locals.db.collection('products').findOneAndUpdate(
                    { id: productObject.id },
                    { $inc: { lager: productObject.lager } },
                    { returnOriginal: false }
                );

            } else {
                return req.app.locals.db.collection('products').insertOne(productObject);
            }
        })
        .then(result => {
            res.status(201).send(` '${req.body.id}' är nu tilllagd! `);
        })
        .catch(next);
});








module.exports = router;