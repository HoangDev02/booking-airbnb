import { IsBoolean, IsOptional } from "class-validator";

export class updateBookingActiveDto {
  @IsBoolean()
  @IsOptional()
  active: boolean;
}