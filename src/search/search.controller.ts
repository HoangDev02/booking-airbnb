import { Controller, Get, Query } from '@nestjs/common';
import { SearchRoomsDto } from './dto';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
    constructor(private searchService: SearchService) {}
    @Get('find')
    async searchRooms(@Query() searchRoomsDto: SearchRoomsDto) {
      return this.searchService.searchRooms(searchRoomsDto);
    }
}
