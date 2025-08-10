import { Sequelize } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import dbConfig from '../config/db';

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

interface UrlAttributes {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt?: Date;
}

interface ClickAttributes {
  id: number;
  urlId: number;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  region?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  deviceType?: string;
  timestamp?: Date;
}

interface UrlCreationAttributes extends Partial<UrlAttributes> {}
interface ClickCreationAttributes extends Partial<ClickAttributes> {}

@Table({
  tableName: 'Urls',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
})
class Url extends Model<UrlAttributes, UrlCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  originalUrl!: string;

  @AllowNull(false)
  @Unique
  @Column(DataTypes.STRING(10))
  shortCode!: string;

  @HasMany(() => Click, { foreignKey: 'urlId', as: 'clicks' })
  clicks!: Click[];
}

@Table({
  tableName: 'Clicks',
  timestamps: true,
  createdAt: 'timestamp',
  updatedAt: false,
})
class Click extends Model<ClickAttributes, ClickCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  id!: number;

  @ForeignKey(() => Url)
  @Column(DataTypes.INTEGER)
  urlId!: number;

  @Column(DataTypes.STRING)
  ipAddress?: string;

  @Column(DataTypes.TEXT)
  userAgent?: string;

  @Column(DataTypes.STRING)
  referrer?: string;

  @Column(DataTypes.STRING)
  region?: string;

  @Column(DataTypes.STRING)
  browser?: string;

  @Column(DataTypes.STRING)
  browserVersion?: string;

  @Column(DataTypes.STRING)
  os?: string;

  @Column(DataTypes.STRING)
  deviceType?: string;

  @BelongsTo(() => Url, { foreignKey: 'urlId', as: 'url' })
  url!: Url;
}

sequelize.addModels([Url, Click]);

export { sequelize, Url, Click };