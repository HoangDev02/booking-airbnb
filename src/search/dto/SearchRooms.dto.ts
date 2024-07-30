import { IsDateString, IsOptional, IsString } from 'class-validator';

export class SearchRoomsDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  children: string;
  @IsString()
  adult: string;
}
