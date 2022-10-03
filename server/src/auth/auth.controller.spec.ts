import { createMock } from "@golevelup/ts-jest";
import { Test, TestingModule } from "@nestjs/testing";
import { SignedUserReq } from "src/common/interfaces";
import { UserFactory } from "src/database/factories/user.factory";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserService } from "src/modules/users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
    let controller: AuthController;
    let authService: AuthService;

    const userFactory = new UserFactory();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [PrismaService, UserService, AuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe("signup", () => {
        it("should call signup service", async () => {
            const mockUser = userFactory.newMockUser();
            jest.spyOn(authService, "signUp").mockImplementationOnce(async () => undefined);

            await controller.signUp(mockUser);

            expect(authService.signUp).toBeCalled();
        });
    });

    describe("signin", () => {
        it("should call signin service", async () => {
            const mockUser = userFactory.newMockUser();
            jest.spyOn(authService, "signIn").mockImplementationOnce(async () => undefined);

            await controller.signIn(mockUser);

            expect(authService.signIn).toBeCalled();
        });
    });

    describe("delete", () => {
        it("should call deleteAccount service", async () => {
            const mockRequest = createMock<SignedUserReq>();
            jest.spyOn(authService, "deleteAccount").mockImplementationOnce(async () => undefined);

            await controller.deleteAccount(mockRequest);

            expect(authService.deleteAccount).toBeCalled();
        });
    });
});
