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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { District } from './models/district.models';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'Create District' })
  @ApiResponse({ status: 201, type: District })
  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: 'Get All District' })
  @ApiResponse({ status: 200, type: District })
  @Get()
  async findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'Get District By Id' })
  @ApiResponse({ status: 200, type: District })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }
  @ApiOperation({ summary: 'Update District By Id' })
  @ApiResponse({ status: 200, type: District })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: 'Delete District By Id' })
  @ApiResponse({ status: 200, type: District })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.districtService.remove(+id);
  }
}
