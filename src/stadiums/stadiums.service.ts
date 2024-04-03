import { Injectable } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stadium } from './models/stadium.models';

@Injectable()
export class StadiumsService {
  constructor(@InjectModel(Stadium) private stadiumRepo:typeof Stadium){}
  create(createStadiumDto: CreateStadiumDto) {
    return this.stadiumRepo.create(createStadiumDto);
  }

  findAll() {
    return this.stadiumRepo.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.stadiumRepo.findByPk(id)
  }

  update(id: number, updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumRepo.update(updateStadiumDto,{where:{id},returning:true})
  }

  remove(id: number) {
    return this.stadiumRepo.destroy({where:{id}})
  }
}
