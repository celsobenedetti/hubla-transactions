import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateVendorDto } from "./dto/create-vendor.dto";

@Injectable()
export class VendorsService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createVendorDto: CreateVendorDto) {
        return this.prismaService.vendor.create({
            data: createVendorDto,
        });
    }

    async findByName(name: string) {
        return this.prismaService.vendor.findUnique({ where: { name } });
    }

    update(id: number, _updateVendorDto: CreateVendorDto) {
        return `TODO: This action updates a #${id} vendor`;
    }

    async remove(id: number) {
        return this.prismaService.vendor.delete({ where: { id } });
    }
}
