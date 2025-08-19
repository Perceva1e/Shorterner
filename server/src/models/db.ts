import { Sequelize } from 'sequelize-typescript';
import dbConfig from '../config/db';
import { Url } from './Url';
import { Click } from './Click';

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
    dialectOptions: dbConfig.dialectOptions,
  }
);

sequelize.addModels([Url, Click]);

export { sequelize, Url, Click };