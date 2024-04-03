import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.models';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtServiceRepo:typeof District){}
  
  
 async create(createDistrictDto: CreateDistrictDto) {
    return this.districtServiceRepo.create(createDistrictDto)
  }

  async findAll() {
    return this.districtServiceRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    return this.districtServiceRepo.findByPk(id)
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const result = await this.districtServiceRepo.update(updateDistrictDto,{where:{id},returning:true})
    return result[1][0]
  }

  async remove(id: number) {
    return this.districtServiceRepo.destroy({where:{id}})
  }
}
