import { DataSource } from 'typeorm';
import { Station } from './entities/station.entity';

export const photoProviders = [
  {
    provide: 'STATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Station),
    inject: ['DATA_SOURCE'],
  },
];