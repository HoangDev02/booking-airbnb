import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto';

@Injectable()
export class RoomService {
    constructor(private readonly prisma: PrismaService) {}
    async createRoom(dto: CreateRoomDto) {
        try {
            const room = await this.prisma.room.create({
                data: {
                    ...dto
                }
            });
            return room;
        }catch(error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Room with the same name already exists');
            }
            throw error;
        }
    }
    async getRooms() {
        return this.prisma.room.findMany();
    }
    async getRoomById(id: number) {
        return this.prisma.room.findUnique({
            where: {
                id: id
            }
        });
    }
    
    async getRoomByIdHotel(id: number) {
        return this.prisma.room.findMany({
            where: {
                hotelId: id
            },
            include: {
                bookings: true
            }
        });
    }
 }
