import { IsString } from "class-validator";

export class updateAmentities {
    @IsString()
    title: string

    @IsString()
    icon: string
}