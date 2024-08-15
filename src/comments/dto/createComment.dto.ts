import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createCommentDto {
    @IsNumber()
    @IsNotEmpty()
    HotelId: number

    @IsString()
    @IsNotEmpty()
    content: string
}