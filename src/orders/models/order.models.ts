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
  start_time: string;
  end_time: string;
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
  @Column({ type: DataType.STRING })
  start_time: string;
  @Column({ type: DataType.STRING })
  end_time: string;

  @Column({ type: DataType.DECIMAL })
  price: number;
}
