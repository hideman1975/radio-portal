import { Module, forwardRef } from '@nestjs/common';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ 
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Station]),
    
   ],
  controllers: [StationController],
  providers: [StationService],
  exports: [StationService]
})
export class StationModule {}
