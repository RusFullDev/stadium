import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './models/region.models';

@Injectable()
export class RegionService {
constructor(@InjectModel(Region) private regionServiceRepo:typeof Region){}

  async create(createRegionDto: CreateRegionDto) {
    return this.regionServiceRepo.create(createRegionDto)
  }

  async findAll() {
    return this.regionServiceRepo.findAll({include:{all:true}});
  }

 async findOne(id: number) {
    return this.regionServiceRepo.findByPk(id)
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const result = await this.regionServiceRepo.update(updateRegionDto,{where:{id},returning:true})
    return result[1][0]
  }

  async remove(id: number) {
    return this.regionServiceRepo.destroy({where:{id}})
  }
}
