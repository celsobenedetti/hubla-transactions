import { Test, TestingModule } from "@nestjs/testing";
import { UserFactory } from "src/database/factories/user.factory";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserService } from "./user.service";

describe("UserService", () => {
    let userService: UserService;
    let prismaService: PrismaService;

    const factory = new UserFactory();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, PrismaService],
        }).compile();

        userService = module.get<UserService>(UserService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe("create", () => {
        it("should call prismaService.create", async () => {
            jest.spyOn(prismaService.user, "create").mockImplementationOnce((): any => undefined);

            await userService.create(factory.newMockUser());

            expect(prismaService.user.create).toBeCalled();
        });
    });

    describe("findByEmail", () => {
        it("should call prismaService.findUnique", async () => {
            jest.spyOn(prismaService.user, "findUnique").mockImplementationOnce(
                (): any => undefined,
            );

            await userService.findByUsername(factory.newMockUser().username);

            expect(prismaService.user.findUnique).toBeCalled();
        });
    });

    describe("remove", () => {
        it("should call prismaService.delete", async () => {
            jest.spyOn(prismaService.user, "delete").mockImplementationOnce((): any => undefined);

            await userService.remove(factory.newMockUser().id);

            expect(prismaService.user.delete).toBeCalled();
        });
    });
});
