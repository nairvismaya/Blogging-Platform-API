import { Sequelize } from "sequelize";

const db = new Sequelize("blogs", "root", "Pas1234567$", {
  host: "localhost",
  dialect: "mysql",
});
db.sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
  });
export default db;
