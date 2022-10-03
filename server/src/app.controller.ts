import { Controller, Get } from "@nestjs/common";
import { AllowUnauthorizedRequest } from "./common/decorators";

@Controller()
export class AppController {
    @Get()
    @AllowUnauthorizedRequest()
    getHello(): string {
        return "Hello from Nest server";
    }
}
