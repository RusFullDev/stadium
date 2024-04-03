import { Injectable } from '@nestjs/common';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ComfortStadium } from './models/comfort_stadium.models';

@Injectable()
export class ComfortStadiumService {
  constructor(
    @InjectModel(ComfortStadium)
    private comfortStadiumRepo: typeof ComfortStadium,
  ) {}
  async create(createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfortStadiumRepo.create(createComfortStadiumDto)
  }

  async findAll() {
    return this.comfortStadiumRepo.findAll()
  }

  async findOne(id: number) {
    return this.comfortStadiumRepo.findByPk(id)
  }

  async update(id: number, updateComfortStadiumDto: UpdateComfortStadiumDto) {
    return this.comfortStadiumRepo.update(updateComfortStadiumDto,{where:{id},returning:true})[1][0]
  }

  async remove(id: number) {
    return this.comfortStadiumRepo.destroy({where:{id}})
  }
}
