import { Sequelize } from "sequelize";
import { ENV_NODE_ENV } from "../../../secret";

const env = `${ENV_NODE_ENV}`;
const config = require(__dirname + '/../../../config/config.js')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };