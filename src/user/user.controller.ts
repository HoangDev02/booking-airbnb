import { Body, Controller, Get, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateRoleIdUserDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { getUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get(':id')
    async getUserById(@getUser('id', ParseIntPipe) userId: number) {
        return this.userService.getUserById(userId);
    }

    @Patch('/update/:id') 
    async updateUserRole(@getUser('id', ParseIntPipe) userId: number, @Body() roleId: UpdateRoleIdUserDto) {
        return this.userService.updateUserRole(userId, roleId);
    }
    
    @Post('/change-password/:id')
    async changePassword(@getUser('id', ParseIntPipe) userId: number, @Body() {oldPassword, newPassword}: {oldPassword: string, newPassword: string}) {
        return this.userService.changePassword(userId, oldPassword, newPassword);
    }

}
