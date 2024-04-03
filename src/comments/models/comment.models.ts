import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadium } from 'src/stadiums/models/stadium.models';

import { User } from 'src/users/models/user.model';

interface ICreateComment {
  userId: number;
  stadiumId: number;
  impression: string;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, ICreateComment> {
  @ApiProperty({ example: 1, description: 'Admin ID unikal raqami' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
  })
  stadiumId: number;
  @BelongsTo(() => Stadium)
  stadium: Stadium;

  @Column({
    type: DataType.STRING,
  })
  impression: string;
}
