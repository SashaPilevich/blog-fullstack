const { MyPost, User } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");

class myPostController {
  async create(req, res, next) {
    try {
      const { image } = req.files;
      let { title, text, userId } = req.body;
      let filename = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", filename));
      const myPost = await MyPost.create({
        title,
        text,
        userId,
        image: filename,
      });

      return res.json(myPost);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getUserPost(req, res) {
    const userId = req.query.id;
    // const { userId } = req.params;
    const myPosts = await MyPost.findAll({ where: { userId } });
    return res.json(myPosts);
  }
  async getOne(req, res) {
    const id = req.params.id;
    const myPosts = await MyPost.findOne({ where: { id } });
    // console.log(res.json(myPosts));
    return res.json(myPosts);
  }
  // async getOne(req, res) {
  //   const { id } = req.params;
  //   const userId = req.query.id;
  //   const myPost = await MyPost.findOne({ where: { userId, id } });
  //   return res.json(myPost);
  // }
  async deleteOne(req, res) {
    const id = req.params.id;
    const myPost = await MyPost.destroy({ where: { id } });
    return res.json(myPost);
  }
  async editMyPost(req, res, next) {
    try {
      const { image } = req.files;
      let filename = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", filename));

      let { title, text } = req.body;
      const id = req.params.id;
      const myPost = await MyPost.update(
        {
          text,
          title,
          image: filename,
        },
        { where: { id } }
      );

      return res.json(myPost);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new myPostController();
