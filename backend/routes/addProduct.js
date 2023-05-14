var express = require('express');
var router = express.Router();



router.post("/", function (req, res) {
    const productObject = req.body;

    req.app.locals.db
        .collection("products")
        .findOne({ id: productObject.id })
        .then((existingProduct) => {
            if (existingProduct) {
                return req.app.locals.db.collection("products").findOneAndUpdate(
                    { id: productObject.id },
                    { $inc: { lager: productObject.lager } },
                    { returnOriginal: false }
                );
            } else {
                return req.app.locals.db
                    .collection("products")
                    .insertOne(productObject);
            }
        })
        .then((result) => {
            if (result.value) {
                res.status(200).send("Utökade lager");
            } else {
                res.status(201).send("Produkt tillagd ");
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error");
        });
});




module.exports = router;