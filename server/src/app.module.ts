import { Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { JwtGuard } from "./auth/guards/jwt.guard";
import { JwtInterceptor } from "./common/interceptors/jwt.interceptor";
import { PrismaService } from "./database/prisma/prisma.service";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [AuthModule, UserModule],
    controllers: [AppController],
    providers: [
        PrismaService,
        { provide: APP_GUARD, useClass: JwtGuard },
        { provide: APP_INTERCEPTOR, useClass: JwtInterceptor },
    ],
})
export class AppModule {}
