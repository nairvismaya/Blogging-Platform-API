import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes}=Sequelize;

const Users=db.define('users',{
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
   email: {
    type:DataTypes.STRING
    },
    username:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
},{
        freezeTableName:true,
        timestamps: false,
});

export default Users;