import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCommentDto } from './dto';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService, private roomService: RoomService) {}


    /* dk first 1 : booking success
       dk first 2: rating 1 -> 5star
       dk first 3: comment 
    */
    async createComment(userId:number,dto: createCommentDto) {
        try {
            const {HotelId} =  dto
            const existingRating =  await this.prisma.hotel.findUnique({
                where: {
                    id: HotelId,
                    rating: {
                        gt: 0
                    }
                }
            })
            
            if (!existingRating) {
                throw new HttpException('Hotel not found or has no rating', HttpStatus.NOT_FOUND);
            }
            const existingRoom = this.roomService.getRoomByIdHotel(HotelId)
            if (!existingRoom) {
                throw new Error('Room not found')
            }
            const mapdata = (await existingRoom).flatMap((item) => item.bookings.map((e) => e.active === true))
            console.log(mapdata);
            
            if (!mapdata.includes(true)) {
                throw new HttpException('User has no active booking', HttpStatus.BAD_REQUEST);
            }
            
            const create = await this.prisma.comments.create({
                data: {
                    userId: userId,
                    HotelId: HotelId,
                    ...dto
                },
            })
            return create
        } catch (error) {
            throw new HttpException(`Failed to create comment: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllCommentByHotelId(hotelId: number) {
        const comment = this.prisma.comments.findMany({
            where: {
                HotelId: hotelId
            }
        })
        return comment
    }
}
