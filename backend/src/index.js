import dotenv from "dotenv";
dotenv.config();
import connectToDB from "./db/db.js";
import { app } from "./app.js";

connectToDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` SERVER RUNNING ON PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("SERVER CONNECTION FAILED !!", err);
  });
