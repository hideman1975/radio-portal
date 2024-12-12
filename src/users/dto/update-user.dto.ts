import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, MinLength } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: number
    
    @IsEmail()
    email: string;

    firstName: string;

    lastName: string;

    @MinLength(6, { message: 'Password must be more then 6 symbols'})
    password: string;

}
