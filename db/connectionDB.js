import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const sequelize = new Sequelize(
  "bsfxwlyld8gs2f999zjo",
  "uwlxiibgbzetdlg0",
  "P6WN6XOCgfaKPtliAHvy",
  {
    host: "bsfxwlyld8gs2f999zjo-mysql.services.clever-cloud.com",
    dialect: "mysql",
    dialectModule: mysql2,
    port: 3306,
  }
);
const connectionDB =async()=>{
    return await sequelize.sync({alter:false,force:false}).then(()=>{
        console.log('DB connected!')
    }).catch(err=>{
        console.log({msg:"couldn't connect to DB!",err})

    })
}
export default connectionDB;