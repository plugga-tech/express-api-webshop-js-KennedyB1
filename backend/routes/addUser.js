var express = require('express');
var router = express.Router();


router.post("/", function (req, res) {

    req.app.locals.db.collection("users").insertOne(req.body)
        .then(results => {
            // console.log(results);
            res.status(201).send(`User '${req.body.name}' är nu tilllagd! `);
        }).catch(error => {
            // console.log(error);
            res.status(500).send('Error');
        });


})
//

module.exports = router;