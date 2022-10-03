import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/database/prisma/prisma.service";
import { VendorsService } from "./vendors.service";
import { VendorFactory } from "src/database/factories/vendor.factory";

describe("VendorService", () => {
    let vendorService: VendorsService;
    let prismaService: PrismaService;

    const factory = new VendorFactory();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VendorsService, PrismaService],
        }).compile();

        vendorService = module.get<VendorsService>(VendorsService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe("create", () => {
        it("should call prismaService.create", async () => {
            jest.spyOn(prismaService.vendor, "create").mockImplementationOnce((): any => undefined);

            await vendorService.create(factory.newMockVendor());

            expect(prismaService.vendor.create).toBeCalled();
        });
    });

    describe("findByName", () => {
        it("should call prismaService.findUnique", async () => {
            jest.spyOn(prismaService.vendor, "findUnique").mockImplementationOnce(
                (): any => undefined,
            );

            await vendorService.findByName(factory.newMockVendor().name);

            expect(prismaService.vendor.findUnique).toBeCalled();
        });
    });

    describe("findByNameOrCreate", () => {
        it("should call prismaService.upsert", async () => {
            jest.spyOn(prismaService.vendor, "upsert").mockImplementationOnce((): any => undefined);

            await vendorService.findByNameOrCreate(factory.newMockVendor().name);

            expect(prismaService.vendor.upsert).toBeCalled();
        });
    });

    describe("remove", () => {
        it("should call prismaService.delete", async () => {
            jest.spyOn(prismaService.vendor, "delete").mockImplementationOnce((): any => undefined);

            await vendorService.remove(factory.newMockVendor().id);

            expect(prismaService.vendor.delete).toBeCalled();
        });
    });
});
