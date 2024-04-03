import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminAttr {
  login: string;
  telegram_link: string;
  phone_number: string;
  admin_photo: string;
  hashed_password: string;

}
@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminAttr> {
  @ApiProperty({ example: 1, description: 'Admin ID unikal raqami' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'Admin login' })
  @Column({ type: DataType.STRING, allowNull: false })
  login: string;

  @ApiProperty({ example: '/@admin/tme', description: 'Admin tg link' })
  @Column({ type: DataType.STRING })
  telegram_link: string;

  @ApiProperty({ example: '903214568', description: 'Admin phone number' })
  @Column({ type: DataType.STRING })
  phone_number: string;

  @ApiProperty({ example: 'admin.jpg', description: 'Admin photo' })
  @Column({
    type: DataType.STRING,
  })
  admin_photo: string;

  @ApiProperty({ example: 'sadfw6464we', description: 'Admin password' })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;
  @ApiProperty({ example: 'true or false', description: 'Admin is activa' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({ example: 'true or false', description: 'Admin is creater' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creater: boolean;

  @ApiProperty({ example: 'csdhgudvlsiasoasd65', description: 'Admin refresh token' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
