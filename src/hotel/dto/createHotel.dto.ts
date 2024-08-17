import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHotelDto {
  @IsNumber()
  @Type(() => Number)
  categoryId: number;

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

  // @IsArray()
  // @IsString({ each: true })
  // photos: string[];

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsNumber()
  @Type(() => Number)
  rating: number;

  @IsNumber()
  @Type(() => Number)
  cheapestPrice: number;

  @IsString()
  slug: string;

  @IsNumber()
  @Type(() => Number)
  lat: number; // Latitude
  @IsNumber()
  @Type(() => Number)
  long: number; // Longitude

}
