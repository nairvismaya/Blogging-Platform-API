import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes}=Sequelize;

const Blog=db.define('blog_post',{
    blog_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
comments:{
type:DataTypes.STRING
}
},{
        freezeTableName:true,
        timestamps: true, // This will automatically add createdAt and updatedAt columns
        underscored: true,
});

export default Blog;