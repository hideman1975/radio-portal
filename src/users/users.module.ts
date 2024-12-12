import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';

@Module({
  imports: [ 
   forwardRef(() => AuthModule),
   TypeOrmModule.forFeature([User]),
   
  ],
  providers: [ UsersService ],
  controllers: [UsersController],
  exports: [ UsersService ],
})
export class UsersModule {}
