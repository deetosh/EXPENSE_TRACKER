import { Dialect } from 'sequelize';
import { ENV_DB_HOST, ENV_DB_NAME, ENV_DB_PASSWORD, ENV_DB_PORT, ENV_DB_USER } from '../secret';

interface DBConfig {
  username: string ;
  password: string ;
  database: string ;
  host: string ;
  port: number;
  dialect: Dialect;
  dialectOptions?: {
    ssl?: {
      require: boolean;
      rejectUnauthorized?: boolean;
      ca?: string;
    };
  };
}

interface Config {
  development: DBConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    username: `${ENV_DB_USER}`,
    password: `${ENV_DB_PASSWORD}`,
    database: `${ENV_DB_NAME}`,
    host: `${ENV_DB_HOST}`,
    port: Number(ENV_DB_PORT),
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: `${ENV_DB_USER}`,
    password: `${ENV_DB_PASSWORD}`,
    database: `${ENV_DB_NAME}`,
    host: `${ENV_DB_HOST}`,
    port: Number(ENV_DB_PORT),
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;