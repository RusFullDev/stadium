import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

interface ICreateOrderAttr {
  userId: number;
  date: Date;
  start_time: Date;
  end_time: Date;
  price: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, ICreateOrderAttr> {
  @ApiProperty({ example: 1, description: 'District ID unikal raqami' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.DATE })
  date: Date;
  @Column({ type: DataType.DATE })
  start_time: Date;
  @Column({ type: DataType.DATE })
  end_time: Date;

  @Column({ type: DataType.DECIMAL })
  price: number;
}
