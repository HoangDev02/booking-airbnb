import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHotelDto } from './dto/createHotel.dto';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebseConnect';
import { UpdateHotelStatusDto } from './dto';

@Injectable()
export class HotelService {
  constructor(
    private prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}
  // private userId:number = 1;
  // private  categoryId:number = 1;
  async testFirebase() {
    // const firebaseAdmin = this.firebaseService.getAdminInstance();
    const querySnapshot = await admin.firestore().collection('user').get();
    const plants: any = [];
    querySnapshot.forEach((doc) => {
      plants.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return plants;
  }

  async createHotel(userId: number, dto: CreateHotelDto, buffers: Buffer[]) {
    try {
      // Upload images to Firebase Storage and get URLs
      const photoUrls = await Promise.all(
        buffers.map(async (buffer) => {
          const uploadTo = `hotels/${userId}/${Date.now()}_${Math.floor(Math.random() * 1000)}.webp`; //foulder hotels/IdHotel/img
          return await this.firebaseService.uploadFile(buffer, uploadTo);
        }),
      );

      // Create hotel in Prisma
      const hotel = await this.prisma.hotel.create({
        data: {
          userId: userId,

          ...dto,
          photos: photoUrls,
        },
      });

      return hotel;
    } catch (error) {
      console.error('Error creating hotel or uploading images:', error);
      throw new ForbiddenException('Error creating hotel or uploading images');
    }
  }
  async deleteHotel(Hotelid: number) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: Hotelid },
    });
    if (!hotel)
      throw new ForbiddenException(`Hotel with id ${Hotelid} not found`);
    return await this.prisma.hotel.delete({
      where: { id: Hotelid },
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
  async getHotelByCategoryid(categoryId: number) {

    // hiện hotel phai có ít nhất một phòng, status phải là partial  mới hiện hotel
    const hotels = await this.prisma.hotel.findMany({
      where: {
        categoryId: categoryId,
        status: 'partial',
        room: {
          some: {}, // Kiểm tra xem có ít nhất một phòng tồn tại
        },
      },
    });
  
    if (hotels.length === 0) {
      throw new ForbiddenException(
        `Hotel with category id ${categoryId} not found or no rooms available`,
      );
    }
  
    return hotels;
  }
  async getHotelBySlug(slug: string) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { slug: slug },
      include: {
        room: {
          select: {
            roomNumbers :  {
              select: {
                unavailableDates: true,
              }
            }
          }
        }
      }
    });
    if (!hotel) {
      throw new ForbiddenException(`Hotel with slug ${slug} not found`);
    }
    return hotel
  }

  //if user create hotel, admin can update status of hotel (active, inactive, pending)
  async updateHotelStatus(
    hotelId: number,
    updateStatusDto: UpdateHotelStatusDto,
  ) {
    const { status } = updateStatusDto;

    // Kiểm tra xem hotel có tồn tại không
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${hotelId} not found`);
    }

    // Cập nhật status của hotel
    const updatedHotel = await this.prisma.hotel.update({
      where: { id: hotelId },
      data: { status },
    });

    return updatedHotel;
  }
  async getRatingHotel(hotelId: number) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });
    if (!hotel) {
      throw new ForbiddenException(`Hotel with id ${hotelId} not found`);
    }
    return { rating: hotel.rating };
  }
}
