import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOffering } from './dto';

@Injectable()
export class OfferingService {
    constructor(private prisma: PrismaService){}

    async createOfferings(dto: CreateOffering) {
        const create = this.prisma.offering.create({
            data: {
                ...dto
            }
        })
        return create
    }
    async getOfferingById(id: number) {
        const offering = this.prisma.offering.findUnique( {
            where: {
                id
            }
        })
        return offering
    }
    async getOfferings() {
        return this.prisma.offering.findMany()

    }
}
