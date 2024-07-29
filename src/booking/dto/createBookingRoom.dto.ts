// src/bookings/dto/create-booking-room.dto.ts

import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookingRoomDto {

  @IsInt()
  quantity: number;

  @IsNumber()
  total: number;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsInt()
  number: number;
  
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Date)
  unavailableDates: Date[];
}
