import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { ProductsService } from "../products/products.service";
import { VendorsService } from "../vendors/vendors.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionInpuDto } from "./dto/transaction-input.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

@Injectable()
export class TransactionsService {
    constructor(
        private readonly vendorsService: VendorsService,
        private readonly productsService: ProductsService,
        private readonly prismaService: PrismaService,
    ) {}

    async createMany(transactionsFile: string) {
        const transactionsData = this.parseInputFile(transactionsFile);
        const transactionsDtos = await this.normalizeTransactionsData(transactionsData);

        return this.prismaService.transaction.createMany({ data: transactionsDtos });
    }

    findAll() {
        return this.prismaService.transaction.findMany();
    }

    findOne(id: number) {
        return this.prismaService.transaction.findUnique({ where: { id } });
    }

    update(id: number, _updateTransactionDto: UpdateTransactionDto) {
        return `TODO: This action updates a #${id} transaction`;
    }

    remove(id: number) {
        return this.prismaService.transaction.delete({ where: { id } });
    }

    //Internal business logic

    private parseInputFile(transactionsFile: string): TransactionInpuDto[] {
        const lines = transactionsFile.split("\n").filter((line) => line.length);
        return lines.map(this.parseTransactionInput);
    }

    private parseTransactionInput(transactionInput: string): TransactionInpuDto {
        const type = transactionInput.charAt(0);
        const dateString = transactionInput.substring(1, 26);
        const productName = transactionInput.substring(26, 56).trimEnd();
        const value = +transactionInput.substring(56, 66);
        const vendorName = transactionInput.substring(66).trimEnd();

        if (!type || !dateString || !productName || !value || !vendorName) {
            throw new BadRequestException(
                "The file formatting seems to be invalid, please check and try again",
            );
        }
        return { type, dateString, productName, value, vendorName };
    }

    private async normalizeTransactionsData(
        transactionsData: TransactionInpuDto[],
    ): Promise<CreateTransactionDto[]> {
        return Promise.all(
            transactionsData.map(async ({ type, value, dateString, productName, vendorName }) => {
                const date = new Date(dateString);
                const { id: vendorId } = await this.vendorsService.findByNameOrCreate(vendorName);
                const { id: productId } = await this.productsService.findByNameOrCreate(
                    productName,
                    vendorId,
                );
                return { type, date, value, vendorId, productId };
            }),
        );
    }
}
