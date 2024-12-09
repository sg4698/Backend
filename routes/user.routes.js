// import { userRegister } from '../controllers/user.controller';
const userRegister = require("../controllers/user.controller")
const Router = require('express');
const router = Router();
const uploads = require("../middlewares/multer.middleware")


router.route("/register").post(
    uploads.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:3
        },
    ]),
    userRegister
)


module.exports = router;