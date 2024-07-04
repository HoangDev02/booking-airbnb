import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto';

@Controller('api/categories')
export class CategoriesController {
    constructor(private service: CategoriesService) {}
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
    @Patch('update/:id')
    updateCategory(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCategoriesDto){
        return this.service.updateCategory(id, dto);
    }
}
