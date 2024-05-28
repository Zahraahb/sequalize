import userModel from "../../../db/models/user.model.js"
import postModel from "../../../db/models/post.model.js"
import commentModel from "../../../db/models/comment.model.js"
 import bcrypt from "bcryptjs"

export const registration = async(req,res,next)=>{
    const {userName,email,password} = req.body
    const user = await userModel.findOrCreate({
        
        where:{email},
       defaults: {
        userName,
        email,
        password,
       }

    })
    if(!user[1]){
       return res.status(400).json({msg:"User already exists!"})
    }
    return res.status(200).json({msg:"User created successfully", user:user[0]})


}

export const login = async(req,res,next)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({where:{email}})
        
    if(!user){
        return res.status(400).json({msg:"user not found!"})
    }
    const isMatsh = await bcrypt.compare(password, user.password);
    if(!isMatsh){
        return res.status(400).json({msg:"user not found!"})
    }
    
    return res.status(200).json({msg:"User logged in successfully", user})
    
}

export const logout = async(req,res,next)=>{
    const {id} = req.query
    const user = await userModel.findOne({
        where:{id}})
        if(!user){
            return res.status(400).json({msg:"User not found!"})
        }
        return res.status(200).json({msg:"User logged out successfully"})
    
}

//user with posts and comments

export const userWithPostDetails = async (req, res, next) => {
  const { userId, postId } = req.query;
  const user = await userModel.findOne({
    attributes: ["id", "userName", "email"],
    where: { id: userId },
    
    include: {
      attributes: ["title", "content"],
      where: { id: postId },
      model: postModel,
    
      include: [
        {
          model: commentModel,
          attributes: ["userId", "content"],
        },
      ],
    },
  });
  if (!user) {
    return res.status(400).json({ msg: "User not found!" });
  }
  return res.status(200).json({ user });
};