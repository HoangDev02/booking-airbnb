import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateRoleIdUserDto } from './dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) userId: number) {
        return this.userService.getUserById(userId);
    }

    @Put('/update/:id') 
    async updateUserRole(@Param('id', ParseIntPipe) userId: number, @Body() roleId: UpdateRoleIdUserDto) {
        return this.userService.updateUserRole(userId, roleId);
    }
    
    @Post('/change-password/:id')
    async changePassword(@Param('id', ParseIntPipe) userId: number, @Body() {oldPassword, newPassword}: {oldPassword: string, newPassword: string}) {
        return this.userService.changePassword(userId, oldPassword, newPassword);
    }
}
