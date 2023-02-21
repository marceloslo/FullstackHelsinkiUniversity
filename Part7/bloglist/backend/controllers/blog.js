const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user");
  response.json(blog);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  let newBlog = request.body;
  if (!("likes" in newBlog)) {
    newBlog = { ...newBlog, likes: 0 };
  }

  const user = request.user;
  newBlog = { ...newBlog, user: user.id };

  const blog = new Blog(newBlog);
  try {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result.id);
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json(error.errors);
  }
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === user.id.toString()) {
      const result = await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).json({ error: "User and blog id mismatch" });
    }
  }
);

blogRouter.put("/:id", async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true }
  );
  response.json(updated);
});

blogRouter.post("/:id/comments", async (request, response) => {
  try{
    const blog = await Blog.findById(request.params.id);
    const updatedComments = {comments:blog.comments.concat(request.body)}
    const updated = await Blog.findByIdAndUpdate(request.params.id,
      updatedComments,
      { new: true, runValidators: true }
    );
    response.status(201).send(updated.comments)
  } catch(error){
    response.status(400).json(error.errors);
  }
});

module.exports = blogRouter;
