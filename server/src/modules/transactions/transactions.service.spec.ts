import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Product, Vendor } from "@prisma/client";
import { TransactionFactory } from "src/database/factories/transaction.factory";
import { PrismaService } from "src/database/prisma/prisma.service";
import { ProductsService } from "../products/products.service";
import { VendorsService } from "../vendors/vendors.service";
import { TransactionsService } from "./transactions.service";

describe("TransactionsService", () => {
    let prismaService: PrismaService;
    let transactionsService: TransactionsService;
    let vendorsService: VendorsService;
    let productsService: ProductsService;

    const factory = new TransactionFactory();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PrismaService, TransactionsService, VendorsService, ProductsService],
        }).compile();

        transactionsService = module.get<TransactionsService>(TransactionsService);
        prismaService = module.get<PrismaService>(PrismaService);
        vendorsService = module.get<VendorsService>(VendorsService);
        productsService = module.get<ProductsService>(ProductsService);
    });

    describe("createMany and business logic", () => {
        it("Should parse input and call prisma.createMany", async () => {
            const n = () => undefined;
            jest.spyOn(prismaService.transaction, "createMany").mockImplementationOnce(n);
            jest.spyOn(transactionsService, "parseInputFile").mockImplementationOnce(n);
            jest.spyOn(transactionsService, "normalizeTransactionsData").mockImplementationOnce(n);

            await transactionsService.createMany(factory.newMockTransactionString());

            expect(transactionsService.parseInputFile).toBeCalled();
            expect(transactionsService.normalizeTransactionsData).toBeCalled();
            expect(prismaService.transaction.createMany).toBeCalled();
        });

        describe("parseInputFile", () => {
            it("should return an array", async () => {
                const result = transactionsService.parseInputFile(
                    factory.newMockTransactionString(),
                );
                expect(result).toBeInstanceOf(Array);
                expect(result.length).toBeGreaterThan(0);
            });

            it("should return the correct format", async () => {
                const result = transactionsService.parseTransaction(
                    factory.newMockTransactionString(),
                    0,
                );
                expect(result).toHaveProperty("type");
                expect(result).toHaveProperty("dateString");
                expect(result).toHaveProperty("productName");
                expect(result).toHaveProperty("value");
                expect(result).toHaveProperty("vendorName");
            });

            it("should throw exception if input format is invalid", async () => {
                expect(() =>
                    transactionsService.parseInputFile(
                        factory.newMockTransactionString({ invalid: true }),
                    ),
                ).toThrow(BadRequestException);
            });
        });

        describe("normalizeTransactionsData", () => {
            beforeEach(() => {
                const mockId = { id: factory.newMockTransaction().id } as any;
                jest.spyOn(vendorsService, "findByNameOrCreate").mockResolvedValue(mockId);
                jest.spyOn(productsService, "findByNameOrCreate").mockResolvedValue(mockId);
            });

            it("should return an array with correct format", async () => {
                const result = await transactionsService.normalizeTransactionsData(
                    transactionsService.parseInputFile(factory.newMockTransactionString()),
                );
                expect(result).toBeInstanceOf(Array);
                expect(result.length).toBeGreaterThan(0);
                expect(result[0]).toHaveProperty("type");
                expect(result[0]).toHaveProperty("date");
                expect(result[0]).toHaveProperty("productId");
                expect(result[0]).toHaveProperty("value");
                expect(result[0]).toHaveProperty("vendorId");
            });

            it("should throw exception if input format is invalid", async () => {
                expect(() =>
                    transactionsService.parseInputFile(
                        factory.newMockTransactionString({ invalid: true }),
                    ),
                ).toThrow(BadRequestException);
            });
        });
    });

    describe("findAll", () => {
        it("Should call prisma.findMany", async () => {
            jest.spyOn(prismaService.transaction, "findMany").mockImplementationOnce(
                () => undefined,
            );
            await transactionsService.findAll();
            expect(prismaService.transaction.findMany).toBeCalled();
        });
    });

    describe("findOne", () => {
        it("Should call prisma.findUnique", async () => {
            jest.spyOn(prismaService.transaction, "findUnique").mockImplementationOnce(
                () => undefined,
            );
            await transactionsService.findOne(factory.newMockTransaction().id);
            expect(prismaService.transaction.findUnique).toBeCalled();
        });
    });

    describe("remove", () => {
        it("Should call prisma.delete", async () => {
            jest.spyOn(prismaService.transaction, "delete").mockImplementationOnce(() => undefined);
            await transactionsService.remove(factory.newMockTransaction().id);
            expect(prismaService.transaction.delete).toBeCalled();
        });
    });
});
