import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComfortStadiumService } from './comfort_stadium.service';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';

@Controller('comfort-stadium')
export class ComfortStadiumController {
  constructor(private readonly comfortStadiumService: ComfortStadiumService) {}

  @Post()
  async create(@Body() createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfortStadiumService.create(createComfortStadiumDto);
  }

  @Get()
  async findAll() {
    return this.comfortStadiumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.comfortStadiumService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComfortStadiumDto: UpdateComfortStadiumDto,
  ) {
    return this.comfortStadiumService.update(+id, updateComfortStadiumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.comfortStadiumService.remove(+id);
  }
}
