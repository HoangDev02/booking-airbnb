import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomService } from 'src/room/room.service';
import { createCommentDto } from './dto';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private roomService: RoomService,
  ) {}

  /* dk first 1 : booking success
       dk first 2: rating 1 -> 5star . chỉ đúng user booking mới được comment
       dk first 3: comment 
    */
  async createComment(userId: number, dto: createCommentDto) {
    return this.prisma
      .$transaction(async (prisma) => {
        const { HotelId } = dto;
        const existingRoom = await this.roomService.getRoomByIdHotel(HotelId);
        if (!existingRoom) {
          throw new Error('Room not found');
        }
        // check user has booking
        const mapdata = existingRoom.flatMap((item) =>
          item.bookings.map((e) => e.active === true && e.userId === userId),
        );

        if (!mapdata.includes(true)) {
          throw new HttpException(
            'User has no active booking',
            HttpStatus.BAD_REQUEST,
          );
        }

        const create = await prisma.comments.create({
          data: {
            userId: userId,
            HotelId: HotelId,
            ...dto,
          },
        });
        return create;
      })
      .catch((error) => {
        throw new HttpException(
          `Failed to create comment: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async getAllCommentByHotelId(hotelId: number) {
    const comment = this.prisma.comments.findMany({
      where: {
        HotelId: hotelId,
      },
    });
    return comment;
  }
  async countCommentByHotelId(hotelId: number) {
    const count = await this.prisma.comments.count({
      where: {
        HotelId: hotelId,
      },
    });
    return count;
  }
}
