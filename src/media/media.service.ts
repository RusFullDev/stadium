import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Media } from './models/media.models';

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private mediaRepo:typeof Media){}
  create(createMediaDto: CreateMediaDto) {
    return this.mediaRepo.create(createMediaDto)
  }

  findAll() {
    return this.mediaRepo.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.mediaRepo.findByPk(id)
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.mediaRepo.update(updateMediaDto,{where:{id},returning:true})
  }

  remove(id: number) {
    return this.mediaRepo.destroy({where:{id}})
  }
}
