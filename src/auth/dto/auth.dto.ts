import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email:string
    @IsString()
    username?:string
    @IsString()
    @IsNotEmpty()
    password:string
}
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email:string
    @IsString()
    @IsNotEmpty()
    password:string
}