import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ICategoryAttr {
  name: string;
  parentId: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategoryAttr> {
  @ApiProperty({ example: 1, description: 'Category ID unikal raqami' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Furbol', description: 'Category name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 1, description: 'Parent Category ID unikal raqami' })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  parentId: number;
  @BelongsTo(() => Category)
  category: Category;
}
