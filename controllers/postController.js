const { Post } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
class PostController {
  async create(req, res, next) {
    try {
      let { title, text } = req.body;
      const { image } = req.files;
      let filename = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", filename));
      const post = await Post.create({ title, text, image: filename });
      return res.json(post);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { page, limit } = req.query;
    page = page || 1;
    limit = limit || 6;
    let offset = page * limit - limit;
    const posts = await Post.findAndCountAll({ limit, offset });
    return res.json(posts);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    return res.json(post);
  }
}
module.exports = new PostController();
