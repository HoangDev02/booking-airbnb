import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createAmentites {
  @IsNumber()
  hotelId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
}
