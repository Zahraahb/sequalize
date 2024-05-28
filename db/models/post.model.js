import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";

const postModel = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    references:{
      model: userModel,
      key: "id",
      
    }
  },
},{
  timestamps:true,
  paranoid:true,
  deletedAt:"deleted_posts"

});
postModel.belongsTo(
  userModel,
  {
    as: "author",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "authorId",
  }

);
userModel.hasMany(postModel,{foreignKey: "authorId"})

export default postModel;
