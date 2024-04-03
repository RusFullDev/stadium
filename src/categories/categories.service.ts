import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepo:typeof Category){}


 async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.create(createCategoryDto);
  }

  async findAll() {
    return this.categoryRepo.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return this.categoryRepo.findByPk(id);
  }

 async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const resalt = await this.categoryRepo.create(updateCategoryDto,{where:{id},returning:true})
  return resalt[1][0];
  }

  async remove(id: number) {
    return this.categoryRepo.destroy({where:{id}})
  }
}
