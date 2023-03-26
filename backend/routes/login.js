var express = require('express');
var router = express.Router();


/// Login

router.post('/', function (req, res, next) {
    const { email, password } = req.body;

    req.app.locals.db.collection("users").findOne({ email, password })
        .then(user => {
            if (!user) {
                return res.status(401).send("Invalid email or password.");
            }

            console.log("User logged in:", user.name);
            res.send("Login successful.");
        })
        .catch(next);
});
//

module.exports = router;