// src/bookings/dto/get-bookings.dto.ts

import { IsInt, IsString, IsBoolean, IsNumber, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class RoomDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsInt()
  maxPeople: number;

  @IsString()
  desc: string;
}

class BookingDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  phone: number;

  @IsBoolean()
  active: boolean;

  @IsDate()
  @Type(() => Date)
  modifiedOn: Date;

  @ValidateNested()
  @Type(() => RoomDto)
  room: RoomDto;
}

export class GetBookingsDto {
  @IsInt()
  hotelId: number;

  @IsString()
  hotelName: string;

  @ValidateNested({ each: true })
  @Type(() => BookingDto)
  bookings: BookingDto[];
}
