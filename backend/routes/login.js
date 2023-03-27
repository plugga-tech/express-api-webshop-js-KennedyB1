var express = require('express');
var router = express.Router();


/// Login

router.post('/', function (req, res, next) {
    const { email, password } = req.body;

    req.app.locals.db.collection("users").findOne({ email, password })
        .then(user => {
            if (!user) {
                return res.status(401).send("Fel email eller lösenord");
            }

            console.log("Loggade in som:", user.name);
            res.send("Inloggning funkade");
        })
        .catch(next);
});
//

module.exports = router;