"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
