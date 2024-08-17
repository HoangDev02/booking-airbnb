import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { getUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { createCommentDto } from './dto';

@Controller('comments')
export class CommentsController {
  constructor(private service: CommentsService) {}
  @Get('hotel/:id')
  async getAllCommentByHotelId(@Param('id', ParseIntPipe) id: number) {
    return this.service.getAllCommentByHotelId(id);
  }
  @Post('create')
  @UseGuards(JwtGuard)
  async createComment(@getUser('id', ParseIntPipe) userId: number, @Body() dto: createCommentDto) {
    return this.service.createComment(userId,dto);
  }

  @Get('count/:hotelId')
  async countComment(@Param('hotelId', ParseIntPipe) hotel: number) {
    return this.service.countCommentByHotelId(hotel);
  }
}
