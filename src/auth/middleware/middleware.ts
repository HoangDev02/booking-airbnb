import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header Authorization
      
      if (token) {
        const user = await this.authService.validateUserFromToken(token); // Xác thực và lấy thông tin user từ token
        req.user = user; // Gán user vào request để các guard sau này có thể sử dụng
      }
    } catch (error) {
      // Xử lý lỗi xác thực (ví dụ: token hết hạn, không hợp lệ, ...)
      console.error('Authentication error:', error.message);
    }
    next(); // Tiếp tục xử lý các middleware và guard tiếp theo
  }
}
