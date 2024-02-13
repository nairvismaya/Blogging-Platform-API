import Blog from "../models/blog_post.js";

export const getBlog = async (req, res) => {
  try {
    const post = await Blog.findAll();
    res.send(post);
  } catch (err) {
    console.log(err);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const post = await Blog.findAll({
      where: {
        blog_id: req.params.blog_id,
      },
    });
    res.send(post[0]);
  } catch (err) {
    console.log(err);
  }
};

export const createBlog = async (req, res) => {
  try {
    await Blog.create(req.body);
    res.json({
      message: "Blog created!!",
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBlog = async (req, res) => {
  try {
    await Blog.update(req.body, {
      where: {
        blog_id: req.params.blog_id,
      },
    });
    res.json({
      message: "Blog Updated",
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.destroy({
      where: {
        blog_id: req.params.blog_id,
      },
    });
    res.json({
      message: "Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComment = async (req, res) => {
  try {
    const post = await Blog.findAll({ attributes: ["comments"] });
    res.json(post.map((blog) => blog.comments));
  } catch (err) {
    console.log(err);
  }
};
export const createComment = async (req, res) => {
  const { blog_id } = req.params;
  const { comments } = req.body;
  try {
    const [rowsUpdated] = await Blog.update(
      { comments: comments },
      { where: { blog_id: blog_id } }
    );
    if (rowsUpdated > 0) {
      const updatedBlog = await Blog.findByPk(blog_id, {
        attributes: ["comments"],
      });
      res.json({ comments: updatedBlog.comments });
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.error("Error executing INSERT query:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteComment = async (req, res) => {
  const { blog_id } = req.params;
  try {
    const deletedBlog = await Blog.findByPk(blog_id, {
      attributes: ["comments"],
    });
    if (deletedBlog) {
      await Blog.update(
        { comments: null }, 
        { where: { blog_id: blog_id } }
      );
      res.json({ comments: deletedBlog.comments });
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.error("Error executing DELETE query:", error);
    res.status(500).send("Internal Server Error");
  }
};
