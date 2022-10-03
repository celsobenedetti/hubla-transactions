import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TransactionFactory } from "src/database/factories/transaction.factory";
import { PrismaService } from "src/database/prisma/prisma.service";
import { ProductsService } from "../products/products.service";
import { VendorsService } from "../vendors/vendors.service";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

describe("TransactionsController", () => {
    let controller: TransactionsController;
    let transactionsService: TransactionsService;

    const transactionFactory = new TransactionFactory();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionsController],
            providers: [PrismaService, TransactionsService, VendorsService, ProductsService],
        }).compile();

        controller = module.get<TransactionsController>(TransactionsController);
        transactionsService = module.get<TransactionsService>(TransactionsService);
    });

    describe("findAll", () => {
        it("should call findAll service", async () => {
            jest.spyOn(transactionsService, "findAll").mockResolvedValueOnce(undefined);
            await controller.findAll();
            expect(transactionsService.findAll).toBeCalled();
        });
    });

    describe("findOne", () => {
        it("should call findOne service", async () => {
            jest.spyOn(transactionsService, "findOne").mockResolvedValueOnce(undefined);
            await controller.findOne(transactionFactory.newMockTransaction().id.toString());
            expect(transactionsService.findOne).toBeCalled();
        });
    });

    describe("remove", () => {
        it("should call remove service", async () => {
            jest.spyOn(transactionsService, "remove").mockResolvedValueOnce(undefined);
            await controller.remove(transactionFactory.newMockTransaction().id.toString());
            expect(transactionsService.remove).toBeCalled();
        });
    });

    describe("uploadFile", () => {
        it("should throw 400 if request has no file ", async () => {
            expect(controller.uploadFile).toThrow(BadRequestException);
        });
    });
});
