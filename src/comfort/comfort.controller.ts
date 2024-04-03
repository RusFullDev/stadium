import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Comfort } from './models/comfort.model';

@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @ApiOperation({ summary: 'create comfort' })
  @ApiResponse({ status: 201, type: Comfort })
  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @ApiOperation({ summary: 'Get All comfort' })
  @ApiResponse({ status: 200, type: Comfort })
  @Get()
  findAll() {
    return this.comfortService.findAll();
  }

  @ApiOperation({ summary: 'Get By ID comfort' })
  @ApiResponse({ status: 200, type: Comfort })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update By ID comfort' })
  @ApiResponse({ status: 200, type: Comfort })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortService.update(+id, updateComfortDto);
  }
  @ApiOperation({ summary: 'Delete By ID comfort' })
  @ApiResponse({ status: 200, type: Comfort })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortService.remove(+id);
  }
}
