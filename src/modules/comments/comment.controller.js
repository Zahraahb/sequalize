import commentModel from "../../../db/models/comment.model.js";
import userModel from "../../../db/models/user.model.js";
import postModel from "../../../db/models/post.model.js";

export const createComment = async (req, res, next) => {
    const {userId,postId} = req.query
    const post = await postModel.findByPk(postId)
    if(!post){
        return res.status(400).json({msg:"Post not found!"})
    }
    const user = await userModel.findByPk(userId)
    if(!user){
        return res.status(400).json({msg:"User not found!"})
    }
    const { content } = req.body;
    const comment = await commentModel.create({
        content,
        postId,
        userId
    });
    return res.status(200).json({msg:"Comment created successfully!", comment})
}

export const readComment = async(req, res,next) => {
    const comment = await commentModel.findByPk(req.query.id, {
      attributes: ["content", ["id", "commentId"], "postId"],
    });
    if(!comment){
        return res.status(400).json({msg:"Comment not found!"})
    }
    return res.status(200).json({comment})
}

export const updateComment = async (req, res, next) => {
    const { userId, commentId } = req.query;
    const comment = await commentModel.findByPk(commentId);
    if (comment.userId!= userId) {
      return res
       .status(400)
       .json({ msg: "Only the author can update this comment!" });
    }
    if(!comment){
        return res.status(400).json({msg:"Comment not found!"})
    }
    const { content } = req.body;
    const updateComment = await comment.update({ content });
    return res
     .status(200)
     .json({ msg: "Comment updated successfully"});
}

export const deleteComment = async (req, res, next) => {
    const { userId, commentId } = req.query;
    const comment = await commentModel.findByPk(commentId);
    const post = await postModel.findByPk(comment.postId)
    console.log(post.authorId);
    
    if(comment.userId!= userId && post.authorId!=userId){
        return res
       .status(400).json({msg:"Only comment author or post author can delete this comment!"})
    }
    if (!comment) {
      return res.status(400).json({ msg: "Comment not found!" });
    }
    await comment.destroy();
    return res.status(200).json({ msg: "Comment deleted successfully" });
    
}