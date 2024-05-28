import postModel from "../../../db/models/post.model.js";
import userModel from "../../../db/models/user.model.js";


export const createPost = async (req, res, next) => {
    const {authorId}=req.query
    const { title, content } = req.body;
    const author = await userModel.findByPk(authorId)
    if(!author){
        return res.status(400).json({msg:"Author not found!"})
    }
    const post = await postModel.create({
        title,
        content,
        authorId
    });
    return res.status(200).json({msg:"Post created successfully", post})
}

export const readPost = async (req, res, next) => {
    const post = await postModel.findByPk(req.query.id,{attributes:["title","content"]})
    if(!post){
        return res.status(400).json({msg:"Post not found!"})
    }
    return res.status(200).json({post})
}

export const updatePost = async (req, res, next) => {
    const {userId,postId} = req.query
    const post = await postModel.findByPk(postId)
    if(post.authorId!=userId){
        return res.status(400).json({ msg: "Only the author can update this post!" });
    }
    if(!post){
        return res.status(400).json({msg:"Post not found!"})
    }
    const { title, content } = req.body;
    const updatePost = await post.update({title,content})
    return res
      .status(200)
      .json({
        msg: "Post updated successfully",
        updatePost: { id: updatePost.id, title, content },
      });
}

export const deletePost = async (req, res, next) => {
    const { userId, postId } = req.query;
    const post = await postModel.findByPk(postId)
    if (post.authorId != userId) {
      return res
        .status(400)
        .json({ msg: "Only the author can delete this post!" });
    }
    if(!post){
        return res.status(400).json({msg:"Post not found!"})
    }
    await post.destroy()
    return res.status(200).json({msg:"Post deleted successfully"})
}

//get specific post with author

export const postWithAuthor = async (req, res, next) => {
  const post = await postModel.findOne({
    attributes: ["title", "content"],
    where: { id: req.query.id },
    include: {
      model: userModel,
     as: "author",
      attributes: ["id","userName", "email"],
    },
  });
  if (!post) {
    return res.status(400).json({ msg: "Post not found!" });
  }
  return res.status(200).json({ post });
};