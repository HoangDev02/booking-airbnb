import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) userId: number) {
        return this.userService.getUserById(userId);
    }
}
