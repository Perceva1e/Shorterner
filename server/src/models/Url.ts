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
} from 'sequelize-typescript';
import { Click } from './Click';

interface UrlAttributes {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt?: Date;
}

@Table({
  tableName: 'Urls',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
})
class Url extends Model<UrlAttributes, Partial<UrlAttributes>> {
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

export { Url };