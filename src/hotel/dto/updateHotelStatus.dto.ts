import { IsEnum, IsNotEmpty } from 'class-validator';
import { HotelStatus } from '@prisma/client'; // Import enum nếu bạn sử dụng enum từ Prisma schema

export class UpdateHotelStatusDto {
  @IsEnum(HotelStatus)
  @IsNotEmpty()
  status: HotelStatus;
}
