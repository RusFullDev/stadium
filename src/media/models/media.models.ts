import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Stadium } from 'src/stadiums/models/stadium.models';


interface ICreateMedia {
  stadiumId: number;
  photo: string;
  description: string;
}

@Table({ tableName: 'media' })
export class Media extends Model<Media> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(()=>Stadium)
  @Column({
    type: DataType.INTEGER,
  })
  stadiumId: number;
  @BelongsTo(()=>Stadium)
stadium:Stadium


  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;
}
