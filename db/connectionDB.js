import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "mysql://uwlxiibgbzetdlg0:P6WN6XOCgfaKPtliAHvy@bsfxwlyld8gs2f999zjo-mysql.services.clever-cloud.com:3306/bsfxwlyld8gs2f999zjo"
);
const connectionDB =async()=>{
    return await sequelize.sync({alter:false,force:false}).then(()=>{
        console.log('DB connected!')
    }).catch(err=>{
        console.log({msg:"couldn't connect to DB!",err})

    })
}
export default connectionDB;