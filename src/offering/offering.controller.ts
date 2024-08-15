import { Controller, Post } from '@nestjs/common';
import { OfferingService } from './offering.service';
import { CreateOffering } from './dto';

@Controller('offering')
export class OfferingController {
    constructor(private service: OfferingService) {}
    @Post("create") 
    createOffering(dto: CreateOffering) {
        return this.service.createOfferings(dto)
    }
}

