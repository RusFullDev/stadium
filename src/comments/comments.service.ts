import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.models';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentRepo:typeof Comment){}
  async create(createCommentDto: CreateCommentDto) {
    return this.commentRepo.create(createCommentDto)
  }

  findAll() {
    return this.commentRepo.findAll({include:{all:true}})
  }


  findOne(id: number) {
    return this.commentRepo.findByPk(id)
  }


  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepo.update(updateCommentDto,{where:{id},returning:true})
  }

  remove(id: number) {
    return this.commentRepo.destroy({where:{id}})
  }
}
