import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import bcrypt from "bcryptjs";

const userModel = sequelize.define("user", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    timestamps: true,
    hooks:{
      beforeCreate :async (user)=>{
        if (user.password){
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt)

        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }

      }
    }
});
export default userModel;