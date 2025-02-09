
import express from 'express'
import RouterConfig from "./src/routes";
import cors from "cors"
import cookie from "cookie-parser"
import './src/modules/auth/passport'
import passport from 'passport'
import session from 'express-session'
import { ENV_FE_BASE_URL, ENV_GOOGLE_OAUTH_URL, ENV_PORT, ENV_PRODUCTION_URL, ENV_SESSION_SECRET } from './secret';

const app: express.Application = express();
const port = ENV_PORT;

console.log(ENV_FE_BASE_URL);

app.use(session({
  secret: `${ENV_SESSION_SECRET}`,   // You should use a secure, random secret key
  resave: false,               // Don't save session if not modified
  saveUninitialized: false,    // Don't create session until something is stored
  cookie: { secure: false }    // Set to true if using HTTPS
}));

app.use(cors({
  origin: [
    `${ENV_FE_BASE_URL}`,
    `${ENV_GOOGLE_OAUTH_URL}`,
    `${ENV_PRODUCTION_URL}`
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