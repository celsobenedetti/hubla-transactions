import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { decodeJwt } from "src/common/utils";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      "allowUnauthorizedRequest",
      context.getHandler()
    );

    return allowUnauthorizedRequest || this.isValidRequest(request);
  }

  async isValidRequest(request: Request) {
    try {
      const token = request.headers?.authorization?.split(" ")[1];
      const payload = decodeJwt(token);

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) return false;
    } catch (err) {
      return false;
    }
    return true;
  }
}
