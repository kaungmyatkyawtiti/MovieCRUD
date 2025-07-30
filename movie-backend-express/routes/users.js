var express = require('express');
var router = express.Router();
const users = require("../controllers/userController.js");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/register", users.registerUser);
router.post("/login", users.loginUser);
router.get("/:id", users.getUserById);

module.exports = router;
