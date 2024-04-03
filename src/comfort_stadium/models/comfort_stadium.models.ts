import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

interface ICreateComfortStadiumAttr {
  stadiumId: number;
  comfortId: number;
}

@Table({ tableName: 'comfort_stadium' })
export class ComfortStadium extends Model<
  ComfortStadium,
  ICreateComfortStadiumAttr
> {
  @ApiProperty({ example: 1, description: 'Admin ID unikal raqami' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.INTEGER,
  })
  stadiumId: number;

  @Column({
    type: DataType.INTEGER,
  })
  comfortId: number;
}
