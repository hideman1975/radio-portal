import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    firstName: string;

    lastName: string;

    @MinLength(6, { message: 'Password must be more then 6 symbols'})
    password: string;

}
