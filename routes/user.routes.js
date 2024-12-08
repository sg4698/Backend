// import { userRegister } from '../controllers/user.controller';
const userRegister = require("../controllers/user.controller")
const Router = require('express');
const router = Router();

router.route("/register").post(userRegister)


module.exports = router;