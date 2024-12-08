const  asyncHandler = require("../utils/asyncHandler")
const userRouter = require("../routes/user.routes")

const userRegister = asyncHandler(async (req,res) => {
    // Sends a response with a status code of 200 (OK) and a JSON object containing the message "ok".
    res.status(200).json({
        message: "ok"
    });
});




module.exports = userRegister