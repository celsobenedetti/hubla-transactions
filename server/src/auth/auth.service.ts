import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { createJwt } from "src/common/utils";
import { compareHash, hashString } from "src/common/utils/auth/bcrypt";
import { UserService } from "src/modules/users/user.service";
import { AuthDto } from "./dto/auth.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signUp(authDto: AuthDto) {
        const existingUser = await this.userService.findByUsername(authDto.username);

        if (existingUser) throw new ConflictException("Username already registered");

        const { id, username } = await this.userService.create({
            ...authDto,
            password: await hashString(authDto.password),
        });

        return { token: createJwt({ id, username }) };
    }

    async signIn(signInDto: AuthDto) {
        const user = await this.userService.findByUsername(signInDto.username);

        const isValidCredentials = user && (await compareHash(signInDto.password, user.password));
        if (!isValidCredentials) throw new UnauthorizedException("Invalid Credentials");

        return { token: createJwt(user) };
    }

    async deleteAccount(userData: JwtPayload) {
        const user = await this.userService.findByUsername(userData.username);

        if (!user) throw new NotFoundException("Email not registered");

        await this.userService.remove(userData.id);
    }
}
