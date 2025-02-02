import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}
import express from 'express'
import RouterConfig from "./src/routes";
import cors from "cors"
import cookie from "cookie-parser"
import './src/modules/auth/passport'
import passport from 'passport'
import session from 'express-session'

const app: express.Application = express();
const port = process.env.PORT;

app.use(session({
  secret: 'EXPENSE_TRACKER_AZAD_SESSION',   // You should use a secure, random secret key
  resave: false,               // Don't save session if not modified
  saveUninitialized: false,    // Don't create session until something is stored
  cookie: { secure: false }    // Set to true if using HTTPS
}));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://accounts.google.com'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());

app.use(passport.initialize());
app.use(passport.session());

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