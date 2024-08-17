import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorator';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<number[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Cho phép truy cập nếu không có yêu cầu role
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

   if (!user || !user.roleId) {
      
      throw new ForbiddenException('You do not have permission (Role)'); 
    }
    return requiredRoles.some((role) => user.roleId === role);
  }
}