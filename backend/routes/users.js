var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

router.get('/', function (req, res, next) {
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

//////////////////

router.post('/', function (req, res, next) {
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).send({ message: 'Hittade inte ID' });
    }

    req.app.locals.db.collection('orders').findOne({ user: userId })
        .then(order => {
            if (!order) {
                return res.status(404).send({ message: 'Användaren har inga ordrar' });
            }

            const userObject = {
                id: order.user,
                orders: order.products
            };

            res.send(userObject);
        })
        .catch(next);
});








module.exports = router;