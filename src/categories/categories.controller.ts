import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto';
import { RoleAuthGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';

@Controller('categories')
export class CategoriesController {
    constructor(private service: CategoriesService) {}

    // number 2 is admin role
    @UseGuards(RoleAuthGuard)
    @Roles(2)
    @Post('create')
    createCategory(@Body() dto: CreateCategoriesDto){
        return this.service.createCategory(dto);
    }
    @Get()
    getCategories() {
        return this.service.getCategories();
    }
    @Get(':id') 
    getCategoryById(@Param('id', ParseIntPipe) id: number){
        return this.service.getCategoryById(id);
    }
    @UseGuards(RoleAuthGuard)
    @Roles(2)
    @Patch('update/:id')
    updateCategory(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCategoriesDto){
        return this.service.updateCategory(id, dto);
    }
    @UseGuards(RoleAuthGuard)
    @Roles(1)
    @Delete('delete/:id')
    deleteCategoryById(@Param('id', ParseIntPipe) id: number){
        return this.service.deleteCategoryById(id);
    }
}
