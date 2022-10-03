import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { VendorsService } from "../vendors/vendors.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly vendorService: VendorsService,
    ) {}

    async create(createProductDto: CreateProductDto) {
        /* return this.prismaService.product.create({ */
        /*     data: createProductDto, */
        /* }); */
    }

    async findByName(name: string) {
        return this.prismaService.product.findUnique({ where: { name } });
    }

    update(id: number, _updateProductDto: CreateProductDto) {
        return `TODO: This action updates a #${id} vendor`;
    }

    async remove(id: number) {
        return this.prismaService.product.delete({ where: { id } });
    }
}
