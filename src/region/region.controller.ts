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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.models';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Create Region' })
  @ApiResponse({ status: 201, type: Region })
  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Get All Region' })
  @ApiResponse({ status: 200, type: Region })
  @Get()
  async findAll() {
    return this.regionService.findAll();
  }
  @ApiOperation({ summary: 'Get  Region By ID' })
  @ApiResponse({ status: 200, type: Region })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Region By ID' })
  @ApiResponse({ status: 200, type: Region })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'Delete Region By ID' })
  @ApiResponse({ status: 200, type: Region })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
