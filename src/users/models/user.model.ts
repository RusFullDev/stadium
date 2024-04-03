import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreateAttr {
  full_name: string;
  phone: string;
  email: string;
  hashed_password: string;
  tg_link: string;
  photo: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreateAttr> {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID unikal raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Alisher Fofurov',
    description: "Foydalanuvchi to'liq ismi",
  })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({
    example: 903091541,
    description: 'Foydalanuvchi telefon raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'alisher@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: 'ajsdujcfysgducgysud',
    description: 'Foydalanuvchi pasporti raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'tme/@alik',
    description: 'Foydalanuvchi telegram linki raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  tg_link: string;

  @ApiProperty({
    example: 'myfoto.img',
    description: 'Foydalanuvchi rasmi',
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_owner: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
