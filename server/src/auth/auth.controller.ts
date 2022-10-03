import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { AllowUnauthorizedRequest } from "src/common/decorators";
import { SignedUserReq } from "src/common/interfaces";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @AllowUnauthorizedRequest()
  async signUp(@Body() signUpDto: AuthDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post("signin")
  @AllowUnauthorizedRequest()
  async signIn(@Body() signInDto: AuthDto) {
    return this.authService.signIn(signInDto);
  }

  @Post("delete")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccount(@Req() { user }: SignedUserReq) {
    return this.authService.deleteAccount(user);
  }
}
