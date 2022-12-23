const Router = require("express");
const router = new Router();
const myPostController = require("../controllers/myPostController");

router.get("/", myPostController.getUserPost);
router.post("/addpost", myPostController.create);
router.delete("/:id", myPostController.deleteOne);
router.get("/:id", myPostController.getOne);
router.patch("/:id", myPostController.editMyPost);

module.exports = router;
