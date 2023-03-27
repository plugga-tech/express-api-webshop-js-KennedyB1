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
    const id = req.body.id;
    if (!id) {
        return res.status(400).send({ message: 'Hittade inte ID' });
    }

    req.app.locals.db.collection('users').findOne({ _id: new ObjectId(id) })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'Användaren hittades ej' });
            }

            const userObject = {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                password: user.password
            };

            res.send(userObject);
        })
        .catch(next);
});





module.exports = router;