import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async generateAccessToken(
    userId: number,
    email: string,
    role: number,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      roles: role,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret,
    });
    return { access_token: token };
  }

  async generateRefreshToken(
    userId: number,
    email: string,
  ): Promise<{ refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '360d',
      secret,
    });
    return { refresh_token: token };
  }

  async register(dto: AuthDto) {
    try {
      const existingEmail = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (existingEmail) {
        throw new ForbiddenException('Email already exists');
      }
      const salt = 10;
      const hashedPassword = await bcrypt.hash(dto.password, salt);
      const user = await this.prisma.user.create({
        data: {
          roleId: 1,
          email: dto.email,
          username: dto.username,
          password: hashedPassword,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Registration failed');
    }
  }

  async login(dto: LoginDto): Promise<{
    access_token: string;
    refresh_token: string;
    userId: number;
    username: string;
  }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new ForbiddenException('Email dose not exits');
      }

      const passwordMatches = await bcrypt.compare(dto.password, user.password);
      if (!passwordMatches) {
        throw new ForbiddenException('wrong password');
      }

      const accessToken = await this.generateAccessToken(
        user.id,
        user.email,
        user.roleId,
      );
      const refreshToken = await this.generateRefreshToken(user.id, user.email);

      return {
        userId: user.id,
        username: user.username,
        ...accessToken,
        ...refreshToken,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  // async refreshAccessToken(refreshToken: string) {
  //   if (!refreshToken) return res.status(401).json("You're not authenticated");

  // }
  async validateUserFromToken(token: string): Promise<User | null> {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET'),
      });

      // Tìm kiếm thông tin người dùng từ payload.sub (ID người dùng trong token)
      const user = await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
        include: {
          role: true, // Bao gồm quan hệ 'role' từ người dùng
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Trả về thông tin người dùng nếu xác thực thành công
      return user;
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException('Invalid token');
    }
  }
}
