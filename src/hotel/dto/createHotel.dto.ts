// src/hotels/dto/create-hotel.dto.ts

import { IsInt, IsString, IsOptional, IsArray, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  distance: string;

  @IsArray()
  photos: string[];

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsNumber()
  rating: number;

  @IsNumber()
  cheapestPrice: number;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsNumber()
  @IsOptional()
  long?: number;

  @IsString()
  slug: string;
}
