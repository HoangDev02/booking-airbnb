import { IsNotEmpty, IsString, IsInt,  ValidateNested, IsArray, Length, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBookingRoomDto } from './CreateBookingRoom.dto';

export class CreateBookingDto {
  @IsInt()
  userId: number;
  @IsInt()
  roomId: number;
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumberString()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  phone: string;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookingRoomDto)
  rooms: CreateBookingRoomDto[];

  active: boolean; // Assuming active flag is passed in the DTO
}
