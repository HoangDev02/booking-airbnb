import { Injectable, ConflictException } from '@nestjs/common';
import { CreateCategoriesDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async createCategory(dto: CreateCategoriesDto) {
        try {
            const category = await this.prisma.category.create({
                data: {
                    ...dto
                }
            });
            return category;
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Category with the same name already exists');
            }
            throw error;
        }
    }
    async getCategories() {
        return this.prisma.category.findMany();
    }
    async getCategoryById(id: number) {
        return this.prisma.category.findUnique({
            where: {
                id
            }
        });
    }
    async updateCategory(id: number, dto: CreateCategoriesDto) {
        return this.prisma.category.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        });
    }
}
