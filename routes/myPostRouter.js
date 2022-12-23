const Router = require("express");
const router = new Router();
const myPostController = require("../controllers/myPostController");
const userController = require("../controllers/userController");
const checkId = require("../middleware/checkIdMiddleware");

router.get("/", myPostController.getUserPost);
router.post("/addpost", myPostController.create);
router.delete("/:id", myPostController.deleteOne);
router.get("/:id", myPostController.getOne);
router.patch("/:id", myPostController.editMyPost);

module.exports = router;
