var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');


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
//


router.post('/', function (req, res, next) {
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

module.exports = router;