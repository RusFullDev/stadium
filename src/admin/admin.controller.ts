import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Admin } from './models/admin.models';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get All Admins' })
  @ApiResponse({ status: 200, type: Admin })
  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get Admin By ID' })
  @ApiResponse({ status: 200, type: Admin })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Admin By ID' })
  @ApiResponse({ status: 200, type: Admin })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete Admin By ID' })
  @ApiResponse({ status: 200, type: Admin })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
