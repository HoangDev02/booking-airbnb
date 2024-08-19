import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshToken {
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
