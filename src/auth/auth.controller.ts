import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { Response } from 'express';
@Controller('api/auth')
export class AuthController {
  constructor(private prisma: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.prisma.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.prisma.login(dto);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF
      path: '/',
    });

    return {
      access_token: tokens.access_token,
      userId: tokens.userId,
      username: tokens.username,
    };
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
    return { message: 'Logged out' };
  }
}
