import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import postModel from "./post.model.js";
import userModel from "./user.model.js";

const commentModel = sequelize.define("comment", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: postModel,
      key: "id",
    }

  },
 userId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    }
       
  },
});
commentModel.belongsTo(postModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "postId",
});
commentModel.belongsTo(userModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "userId",
});
postModel.hasMany(commentModel,{foreignKey: "postId"})
userModel.hasMany(commentModel,{foreignKey: "userId"})

export default commentModel;
