import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHotelDto } from './dto/createHotel.dto';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebseConnect';
@Injectable()
export class HotelService {
    constructor(private prisma: PrismaService, private readonly firebaseService: FirebaseService) {}
    // private userId:number = 1;
    // private  categoryId:number = 1;
    async testFirebase () {
        // const firebaseAdmin = this.firebaseService.getAdminInstance();
        const querySnapshot = await admin.firestore().collection('user').get()
        const plants:any = [];
        querySnapshot.forEach((doc) => {
          plants.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return plants;
    }
 
    async createHotel(userId: number, dto: CreateHotelDto,  buffers: Buffer[]) {
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
              photos: photoUrls
            },
          });
          
          return hotel;
        } catch (error) {
          console.error('Error creating hotel or uploading images:', error);
          throw error;
          
        }
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
    async getHotelByCategoryid(categoryId: number) {
        const hotel = await this.prisma.hotel.findMany({
            where: { categoryId: categoryId },});
        if(!hotel) throw new ForbiddenException(`Hotel with category id ${categoryId} not found`);
        return await this.prisma.hotel.findMany({
          where: { categoryId: categoryId },
        });      
    }
    async getHotelBySlug(slug: string) {
        const hotel = await this.prisma.hotel.findUnique({
            where: { slug: slug },
        });
        if (!hotel) {
            throw new ForbiddenException(`Hotel with slug ${slug} not found`);
        }
        return await this.prisma.hotel.findUnique({
            where: { slug: slug },
        });
    }
}
