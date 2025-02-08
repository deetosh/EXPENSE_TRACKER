import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
  throw dotenvResult.error;
}

export const ENV_PORT = process.env.PORT;
export const ENV_NODE_ENV = process.env.NODE_ENV;
export const ENV_ACCESS_TOKEN_SECRET = `${process.env.ACCESS_TOKEN_SECRET}`
export const ENV_REFRESH_TOKEN_SECRET = `${process.env.REFRESH_TOKEN_SECRET}`
export const ENV_ACCESS_TOKEN_EXPIRY = `${process.env.ACCESS_TOKEN_EXPIRY}`
export const ENV_REFRESH_TOKEN_EXPIRY = `${process.env.REFRESH_TOKEN_EXPIRY}`

export const ENV_GOOGLE_CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`;
export const ENV_GOOGLE_CLIENT_SECRET = `${process.env.GOOGLE_CLIENT_SECRET}`;

export const ENV_DB_NAME = process.env.DB_NAME;
export const ENV_DB_USER = process.env.DB_USER;
export const ENV_DB_HOST = process.env.DB_HOST;
export const ENV_DB_PASSWORD = process.env.DB_PASSWORD;
export const ENV_DB_PORT = process.env.DB_PORT;