import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/categories/models/category.model';
import { District } from 'src/district/models/district.models';
import { Media } from 'src/media/models/media.models';
import { Order } from 'src/orders/models/order.models';
import { Region } from 'src/region/models/region.models';
import { User } from 'src/users/models/user.model';

interface ICreateStadiumAttr {
  categoryId: number;
  ownerId: number;
  contact_with: string;
  name: string;
  address: string;
  regionId: number;
  districtId: number;
  orderId: number;
  location: string;
  buildAt: Date;
}

@Table({ tableName: 'stadium' })
export class Stadium extends Model<Stadium, ICreateStadiumAttr> {
  @ApiProperty({ example: 1, description: 'ID unikal raqami' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 1, description: 'ID unikal raqami' })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;
  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ example: 1, description: 'ID unikal raqami' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  ownerId: number;
  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.STRING })
  contact_with: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  address: string;

  @ApiProperty({ example: 1, description: 'ID unikal raqami' })
  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER })
  regionId: number;
  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({ example: 1, description: 'ID unikal raqami' })
  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER })
  districtId: number;
  @BelongsTo(() => District)
  district: District;

  @ApiProperty({ example: 1, description: 'ID unikal raqami' })
  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  orderId: number;
  @BelongsTo(() => Order)
  order: Order;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.DATE })
  buildAt: Date;



  @HasMany(()=>Media)
  media:Media
}
