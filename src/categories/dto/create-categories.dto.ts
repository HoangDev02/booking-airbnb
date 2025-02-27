import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriesDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    icon: string;
}