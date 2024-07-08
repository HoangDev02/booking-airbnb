// create-room-number.dto.ts

import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateRoomNumberDto {
  @IsInt()
  roomId: number;
  
  @IsOptional()
  @IsInt()
  bookingRoomId?: number;

  @IsInt()
  number: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
