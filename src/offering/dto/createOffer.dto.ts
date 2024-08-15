import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOffering {
    @IsNumber()
    hotelId : number
    @IsString()
    @IsNotEmpty()
    title: string
    @IsString()
    @IsNotEmpty()
    description: string
    @IsString()
    @IsNotEmpty()
    icons: string
    
}