import { Test, TestingModule } from "@nestjs/testing";
import { ProductFactory } from "src/database/factories/product.factory";
import { PrismaService } from "src/database/prisma/prisma.service";
import { ProductsService } from "./products.service";

describe("ProductsService", () => {
    let productsService: ProductsService;
    let prismaService: PrismaService;

    const factory = new ProductFactory();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService, PrismaService],
        }).compile();

        productsService = module.get<ProductsService>(ProductsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe("create", () => {
        it("should call prismaService.create", async () => {
            jest.spyOn(prismaService.product, "create").mockImplementationOnce(
                (): any => undefined,
            );

            await productsService.create(factory.newMockProduct());

            expect(prismaService.product.create).toBeCalled();
        });
    });

    describe("findByName", () => {
        it("should call prismaService.findUnique", async () => {
            jest.spyOn(prismaService.product, "findUnique").mockImplementationOnce(
                (): any => undefined,
            );

            await productsService.findByName(factory.newMockProduct().name);

            expect(prismaService.product.findUnique).toBeCalled();
        });
    });

    describe("findByNameOrCreate", () => {
        it("should call prismaService.upsert", async () => {
            jest.spyOn(prismaService.product, "upsert").mockImplementationOnce(
                (): any => undefined,
            );

            const { name, vendorId } = factory.newMockProduct();
            await productsService.findByNameOrCreate(name, vendorId);

            expect(prismaService.product.upsert).toBeCalled();
        });
    });

    describe("remove", () => {
        it("should call prismaService.delete", async () => {
            jest.spyOn(prismaService.product, "delete").mockImplementationOnce(
                (): any => undefined,
            );

            await productsService.remove(factory.newMockProduct().id);

            expect(prismaService.product.delete).toBeCalled();
        });
    });
});
