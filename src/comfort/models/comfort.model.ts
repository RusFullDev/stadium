import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreateComfortAttr{
    name:string
}

@Table({ tableName: 'comfort' })
export class Comfort extends Model<Comfort, ICreateComfortAttr> {
  @ApiProperty({ example: 1, description: 'Comfort ID unikal raqami' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ description: 'comfort name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
