import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { VendorsService } from "./vendors.service";

@Module({
    providers: [VendorsService, PrismaService],
})
export class VendorsModule {}
