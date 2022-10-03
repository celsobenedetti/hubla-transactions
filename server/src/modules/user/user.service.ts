import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return this.prismaService.user.create({
            data: createUserDto,
        });
    }

    async findByUsername(username: string) {
        return this.prismaService.user.findUnique({ where: { username } });
    }

    update(id: number, _updateUserDto: UpdateUserDto) {
        return `TODO: This action updates a #${id} user`;
    }

    async remove(id: number) {
        return this.prismaService.user.delete({ where: { id } });
    }
}
