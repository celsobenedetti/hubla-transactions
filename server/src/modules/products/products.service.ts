import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        return this.prismaService.product.create({
            data: createProductDto,
        });
    }

    async findByName(name: string) {
        return this.prismaService.product.findUnique({ where: { name } });
    }

    async findByNameOrCreate(name: string, vendorId: number) {
        const product = await this.prismaService.product.findUnique({ where: { name } });
        return product || this.create(new CreateProductDto(name, vendorId));
    }

    update(id: number, _updateProductDto: CreateProductDto) {
        return `TODO: This action updates a #${id} vendor`;
    }

    async remove(id: number) {
        return this.prismaService.product.delete({ where: { id } });
    }
}
