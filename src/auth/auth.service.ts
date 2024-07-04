import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async generateAccessToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }
    const secret = this.config.get('JWT_SECRET')
    const token = await this.jwt.signAsync(payload, { expiresIn: '15m', secret })
    return { access_token: token }
  }

  async generateRefreshToken(userId: number, email: string): Promise<{ refresh_token: string }> {
    const payload = {
      sub: userId,
      email
    }
    const secret = this.config.get('JWT_SECRET')
    const token = await this.jwt.signAsync(payload, { expiresIn: '360d', secret })
    return { refresh_token: token }
  }
  
  async register(dto: AuthDto) {
    try {
      const existingEmail = await this.prisma.user.findUnique({
        where: {
          email: dto.email
        }
      })
      if (existingEmail) {
        throw new ForbiddenException('Email already exists')
      }
      const salt = 10
      const hashedPassword = await bcrypt.hash(dto.password, salt)
      const user = await this.prisma.user.create({
        data: {
          roleId: 0,
          email: dto.email,
          username: dto.username,
          password: hashedPassword
        }
      })
      delete user.password
      return user;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Registration failed');
    }
  }

  async login(dto: LoginDto): Promise<{ access_token: string, refresh_token: string }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email }
      });

      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }

      const passwordMatches = await bcrypt.compare(dto.password, user.password);
      if (!passwordMatches) {
        throw new ForbiddenException('Invalid credentials');
      }

      const accessToken = await this.generateAccessToken(user.id, user.email);
      const refreshToken = await this.generateRefreshToken(user.id, user.email);

      return {
        ...accessToken,
        ...refreshToken
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Login failed');
    }
  }
}
