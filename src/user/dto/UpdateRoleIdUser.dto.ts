import { IsInt } from "class-validator";

export class UpdateRoleIdUserDto {
    @IsInt()
    roleId: number;
} 