import { Dialect } from 'sequelize';

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
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    host: `${process.env.DB_HOST}`,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    host: `${process.env.DB_HOST}`,
    port: Number(process.env.DB_PORT),
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