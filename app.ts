import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}
import express from 'express'
import RouterConfig from "./src/routes";
import cors from "cors"
import cookie from "cookie-parser"


const app: express.Application = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());

// Configure the routes
const routerConfig = new RouterConfig(app);
routerConfig.configureRoutes();

const runningMessage = `Server running at port : ${port}`

// database
import EXTR_DB from './src/db/database'
const dbConn = EXTR_DB.getConnection();

app.listen(port, ()=>{
    console.log(runningMessage);
});