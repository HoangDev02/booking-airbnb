import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHotelDto } from './dto/createHotel.dto';

@Injectable()
export class HotelService {
    constructor(private prisma: PrismaService) {}
    private userId:number = 1;
    private  categoryId:number = 1;
    async createHotel(dto: CreateHotelDto) {
       
        const hotel = await this.prisma.hotel.create({
            data: {
                userId: this.userId,
                categoryId: this.categoryId,
                ...dto,
            },
        })
        return hotel;
    }
    async deleteHotel(Hotelid: number) {
        const hotel = await this.prisma.hotel.findUnique({
            where: { id: Hotelid },
        });
        if(!hotel) throw new ForbiddenException(`Hotel with id ${Hotelid} not found`);
        return await this.prisma.hotel.delete({
            where: { id : Hotelid},
        });
    }
    async getHotels() {
        return await this.prisma.hotel.findMany();
    }
    async getHotelById(hotelId: number) {
        const hotel = await this.prisma.hotel.findUnique({
            where: { id: hotelId },
        });
        if (!hotel) {
            throw new ForbiddenException(`Hotel with id ${hotelId} not found`);
        }
        return await this.prisma.hotel.findUnique({
            where: { id: hotelId },
        });
    }
}
