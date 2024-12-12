import {BadRequestException, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import * as argon2 from 'argon2';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UsersService {
    constructor( 
      @Inject(forwardRef(() => AuthService))
      private usersService: UsersService,
      @InjectRepository(User) private readonly usersRepository: Repository<User>
       ) {}

       async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ email });
      }

      async create(createUserDto: CreateUserDto) {
        const existUser =  await this.usersRepository.findOne({
          where: {
            email: createUserDto.email
          }
        })
        if(existUser) throw new BadRequestException('This email already exist!')
        const user = await this.usersRepository.save({
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: await argon2.hash(createUserDto.password)
    
    })
          return user;
      }
    
      findAll() {
        return this.usersRepository.find()
      }

      async update(id: number, updateUserDto: UpdateUserDto) {
        const existUser =  await this.usersRepository.findOneBy({id})
        if(!existUser) throw new BadRequestException('This user is not exist!')
       await this.usersRepository.update(id, {
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          email: updateUserDto.email,
          password: await argon2.hash(updateUserDto.password)
    
    }).then(item => console.log('Updated', item))
         // return user;
      }
    
      async remove(id: number) {
        const existUser =  await this.usersRepository.findOneBy({id})
        if(!existUser) throw new BadRequestException('This user is not exist!')
          await this.usersRepository.delete(id).then(item => console.log('Deleted', item))
      }
}
