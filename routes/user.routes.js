// import { userRegister } from '../controllers/user.controller';
const userRegister = require("../controllers/user.controller.js");
const logoutUser = require("../controllers/user.controller.js")
const loginUser = require("../controllers/user.controller.js")
const Router = require('express');
const router = Router();
const uploads = require("../middlewares/multer.middleware")
const verifyJWT = require("../middlewares/auth.middleware")


router.route("/register").post(
    uploads.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        },
    ]),
    userRegister
)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)


module.exports = router;