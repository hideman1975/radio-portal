import { BadRequestException, Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) { }

  async create(createStationDto: CreateStationDto) {
    const station = await this.stationRepository.save({
      title: createStationDto.title,
      description: createStationDto.description,
      stream: createStationDto.stream,
      icon: createStationDto.icon,
      location: createStationDto.location
    })
    return station;
  }

  findAll() {
    return this.stationRepository.find();
  }

  findOne(id: number) {
    return this.stationRepository.findOneBy({ id });
  }

  async update(id: number, updateStationDto: UpdateStationDto) {
    const existStation = await this.stationRepository.findOneBy({ id })
    if (!existStation) throw new BadRequestException('This station is not exist!')
    await this.stationRepository.update(id, {
      title: updateStationDto.title,
      description: updateStationDto.description,
      stream: updateStationDto.stream,
      icon: updateStationDto.icon,
      location: updateStationDto.location

    }).then(item => console.log('Updated', item))
  }

  async remove(id: number) {
    const existStation = await this.stationRepository.findOneBy({ id })
    if (!existStation) throw new BadRequestException('This station is not exist!')
    await this.stationRepository.delete(id).then(item => console.log('Deleted', item))
  }
}
