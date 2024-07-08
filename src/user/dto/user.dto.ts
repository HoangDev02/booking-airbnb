import { IsEmail, IsString } from 'class-validator';

export class UserDto {

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString({ each: true })
    roles: string[];


}