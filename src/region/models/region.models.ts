import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { District } from '../../district/models/district.models';

interface IRegionAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, IRegionAttr> {
  @ApiProperty({ example: 1, description: 'Region ID unikal raqami' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "Farg'ona", description: 'Viloyat nomi' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(()=>District)
  district:District[]
}
