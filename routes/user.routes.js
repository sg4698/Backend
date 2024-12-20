// import { userRegister } from '../controllers/user.controller';
const {registerUser,logoutUser,loginUser,refreshAccessToken} = require("../controllers/user.controller.js");
// const logoutUser = require("../controllers/user.controller.js")
// const loginUser = require("../controllers/user.controller.js")
const Router = require('express');
const upload = require("../middlewares/multer.middleware")
const verifyJWT = require("../middlewares/auth.middleware")
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refreshToken").post(refreshAccessToken)

module.exports = router;