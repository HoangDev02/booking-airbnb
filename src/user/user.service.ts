import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRoleIdUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async getUserById(userId: number) {
        return this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    // update role user 
    async updateUserRole(userId: number, role: UpdateRoleIdUserDto) {
        const user = this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
               roleId: role.roleId
            }

        })
        
        return user;
    }
    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
    // change password user
    async changePassword(userId: number, oldPassword:string,newPassword: string): Promise<void> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!user) {
            throw new BadRequestException('User not found');
        }
        const isOldPasswordMatching = await this.comparePasswords(oldPassword, user.password);
        if(!isOldPasswordMatching) {
            throw new BadRequestException('Old password is incorrect');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword
            }
        })
    }
}
