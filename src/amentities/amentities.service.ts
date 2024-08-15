import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createAmentites, updateAmentities } from './dto';

@Injectable()
export class AmentitiesService {
  constructor(private prisma: PrismaService) {}
  //create person amentity
  async createAmentity(dto: createAmentites) {
    try {
      const create = this.prisma.amenities.create({
        data: {
          ...dto,
        },
      });
      return create;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  //create many amentities
  async createAmentities(dtos: createAmentites[]) {
    try {
      const createPromises = dtos.map((dto) =>
        this.prisma.amenities.create({
          data: {
            ...dto,
          },
        }),
      );
      const createdAmenities = await Promise.all(createPromises);
      return createdAmenities;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async getAmentities() {
    return this.prisma.amenities.findMany();
  }
  async getAmentity(id: number) {
    return this.prisma.amenities.findUnique({
      where: {
        id,
      },
    });
  }
  async getAmentityByIdHotel(hotelId: number) {
    const hotel = await this.prisma.amenities.findMany({
      where: {
        hotelId: hotelId,
      },
    });
    return hotel;
  }
  async updateAmentity(id: number, dto: updateAmentities) {
    const update = await this.prisma.amenities.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
    return update;
  }
  async deleteAmentityById(id: number) {
    const deleteAmentity = await this.prisma.amenities.delete({
      where: {
        id,
      },
    });
    return deleteAmentity;
  }
}
