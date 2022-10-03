import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { PrismaService } from "src/database/prisma/prisma.service";
import { VendorsService } from "../vendors/vendors.service";
import { ProductsService } from "../products/products.service";

@Module({
    controllers: [TransactionsController],
    providers: [TransactionsService, PrismaService, VendorsService, ProductsService],
})
export class TransactionsModule {}
