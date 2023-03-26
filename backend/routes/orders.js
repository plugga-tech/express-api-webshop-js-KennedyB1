var express = require('express');
var router = express.Router();


router.get("/", function (req, res) {
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
//

module.exports = router;