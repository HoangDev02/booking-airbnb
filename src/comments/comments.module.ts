import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { RoomService } from 'src/room/room.service';

@Module({
  providers: [CommentsService, RoomService],
  controllers: [CommentsController]
})
export class CommentsModule {}
