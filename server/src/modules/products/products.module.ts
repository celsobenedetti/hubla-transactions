import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { VendorsService } from "../vendors/vendors.service";
import { ProductsService } from "./products.service";

@Module({
    providers: [ProductsService, PrismaService, VendorsService],
})
export class ProductsModule {}
