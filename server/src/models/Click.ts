import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Url } from './Url';

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

@Table({
  tableName: 'Clicks',
  timestamps: true,
  createdAt: 'timestamp',
  updatedAt: false,
})
class Click extends Model<ClickAttributes, Partial<ClickAttributes>> {
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

export { Click };