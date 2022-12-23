const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const myPostRouter = require("./myPostRouter");

router.use("/user", userRouter);
router.use("/posts", postRouter);
router.use("/my_post", myPostRouter);

module.exports = router;
