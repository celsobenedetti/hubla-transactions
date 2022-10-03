import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserFactory } from "src/database/factories/user.factory";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UserService } from "src/modules/user/user.service";
import { AuthService } from "./auth.service";

import * as authUtils from "src/common/utils/auth/bcrypt";

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UserService;

  const userFactory = new UserFactory();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserService, AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe("signup", () => {
    it("should throw 409 if username is already registered", async () => {
      const mockUser = userFactory.newMockUser();
      jest.spyOn(userService, "findByUsername").mockResolvedValueOnce(mockUser);

      expect(authService.signUp(mockUser)).rejects.toBeInstanceOf(
        ConflictException
      );
    });

    it("should call userService.create and return jwt token in success", async () => {
      const mockUser = userFactory.newMockUser();
      jest
        .spyOn(userService, "findByUsername")
        .mockResolvedValueOnce(undefined);
      jest.spyOn(userService, "create").mockResolvedValueOnce(mockUser);

      const result = await authService.signUp(mockUser);

      expect(userService.create).toBeCalled();
      expect(result).toHaveProperty("token");
      expect(result.token).not.toBeFalsy();
    });
  });

  describe("signin", () => {
    it("should throw 401 if username is not found", async () => {
      jest
        .spyOn(userService, "findByUsername")
        .mockResolvedValueOnce(undefined);

      expect(
        authService.signIn(userFactory.newMockUser())
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it("should throw 401 if password is wrong", async () => {
      const mockUser = userFactory.newMockUser();
      jest.spyOn(userService, "findByUsername").mockResolvedValueOnce(mockUser);

      expect(authService.signIn(mockUser)).rejects.toBeInstanceOf(
        UnauthorizedException
      );
    });

    it("should return jwt token in success", async () => {
      const mockUser = userFactory.newMockUser();
      jest.spyOn(userService, "findByUsername").mockResolvedValueOnce(mockUser);
      jest.spyOn(authUtils, "compareHash").mockResolvedValueOnce(true);

      const result = await authService.signIn(mockUser);

      expect(result).toHaveProperty("token");
      expect(result.token).not.toBeFalsy();
    });
  });
  describe("deleteAccount", () => {
    it("should throw 404 if username is not found", async () => {
      jest
        .spyOn(userService, "findByUsername")
        .mockResolvedValueOnce(undefined);

      expect(
        authService.deleteAccount(userFactory.newMockUser())
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("should call userService.remove in success", async () => {
      const mockUser = userFactory.newMockUser();
      jest.spyOn(userService, "findByUsername").mockResolvedValueOnce(mockUser);
      jest
        .spyOn(userService, "remove")
        .mockImplementationOnce(async () => undefined);

      await authService.deleteAccount(mockUser);

      expect(userService.remove).toBeCalled();
    });
  });
});
