import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.models';


@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminServiceRepo: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    return this.adminServiceRepo.create(createAdminDto);
  }

  async findAll() {
    return this.adminServiceRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.adminServiceRepo.findByPk(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const result = await this.adminServiceRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return result[1][0];
  }

  async remove(id: number) {
    return this.adminServiceRepo.destroy({ where: { id } });
  }
}

/**************************************login********************************************/
