import { Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { JwtGuard } from "./auth/guards/jwt.guard";
import { JwtInterceptor } from "./common/interceptors/jwt.interceptor";
import { PrismaService } from "./database/prisma/prisma.service";
import { UserModule } from "./modules/users/user.module";
import { VendorsModule } from "./modules/vendors/vendors.module";
import { ProductsModule } from "./modules/products/products.module";
import { TransactionsModule } from "./modules/transactions/transactions.module";

@Module({
    imports: [AuthModule, UserModule, VendorsModule, ProductsModule, TransactionsModule],
    controllers: [AppController],
    providers: [
        PrismaService,
        { provide: APP_GUARD, useClass: JwtGuard },
        { provide: APP_INTERCEPTOR, useClass: JwtInterceptor },
    ],
})
export class AppModule {}
