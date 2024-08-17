import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AmentitiesService } from './amentities.service';
import { createAmentites, updateAmentities } from './dto';

@Controller('amentities')
export class AmentitiesController {
    constructor(private service: AmentitiesService){}

    @Post('create')
    createAmentity(@Body() dto: createAmentites) {
        return this.service.createAmentity(dto)
    }
    @Post('create/all')
    createAmentities(@Body() dto:createAmentites[]) {
        return this.service.createAmentities(dto)
    }

    @Get()
    getAmentities() {
        return this.service.getAmentities()
    }
    @Get(":id")
    getAmentitiesById(@Param('id', ParseIntPipe) id:number) {
        return this.service.getAmentity(id)
    }

    @Get("hotel/:hotelId")
    getAmentitiesByHotelId(@Param('hotelId', ParseIntPipe) hotelId:number) {
        return this.service.getAmentityByIdHotel(hotelId)
    }
    @Patch("update/:id")
    updateAmentityById(@Param('id', ParseIntPipe) id:number, dto: updateAmentities) {
        return this.service.updateAmentity(id,dto);
    }
    @Delete("delete/:id")
    deleteAmentity(@Param('id', ParseIntPipe) id:number) {
        return this.service.deleteAmentityById(id)
    }
}
