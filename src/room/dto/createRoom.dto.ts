import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @IsInt()
    hotelId: number;
    @IsString()
    title: string;
    @IsNumber()
    price: number;
    @IsInt()
    maxPeople: number;
    @IsString()
    desc: string;
    @IsString()
    slug: string;
}