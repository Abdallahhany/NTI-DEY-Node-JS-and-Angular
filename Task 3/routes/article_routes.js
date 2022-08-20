const express = require("express");
const {
  add,
  addController,
  all,
  edit,
  editController,
  single,
  deleteController,
  addComment,
  addCommentController,
} = require("../controller/article_controller");

const router = express.Router();

router.get("/", all); // render home page (all)

router.get("/add", add); // render add article page
router.post("/add", addController);

router.get("/edit/:id", edit); // render edit article page
router.post("/edit/:id", editController);

router.get("/single/:id", single); // render single article page

router.get("/dele/:id", deleteController);

router.get("/comment/:id", addComment);
router.post("/comment/:id", addCommentController);

module.exports = router;
