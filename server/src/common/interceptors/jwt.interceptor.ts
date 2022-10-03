import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { decodeJwt } from "src/common/utils";

export class JwtInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(" ")[1];

    if (token) {
      const user = decodeJwt(token);
      request.user = user;
    }

    return next.handle();
  }
}
