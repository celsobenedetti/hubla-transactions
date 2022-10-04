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
        return this.prismaService.transaction.findMany({
            include: { product: true, vendor: true },
        });
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

    parseInputFile(transactionsFile: string): TransactionInpuDto[] {
        const lines = transactionsFile.split("\n").filter((line) => line.length);
        return lines.map(this.parseTransaction);
    }

    parseTransaction(transactionString: string, index: number): TransactionInpuDto {
        const type = transactionString.charAt(0);
        const dateString = transactionString.substring(1, 26);
        const productName = transactionString.substring(26, 56).trimEnd();
        const value = +transactionString.substring(56, 66);
        const vendorName = transactionString.substring(66).trimEnd();

        if (!type || !dateString || !productName || !value || !vendorName) {
            throw new BadRequestException(
                `The file formatting seems to be invalid, please check and try again\nLine ${index}: ${transactionString}`,
            );
        }
        return { type, dateString, productName, value, vendorName };
    }

    async normalizeTransactionsData(
        transactionsData: TransactionInpuDto[],
    ): Promise<CreateTransactionDto[]> {
        const transactions = [];
        for (const transaction of transactionsData) {
            const { type, value, dateString, productName, vendorName } = transaction;

            const date = new Date(dateString);
            const { id: vendorId } = await this.vendorsService.findByNameOrCreate(vendorName);
            const { id: productId } = await this.productsService.findByNameOrCreate(
                productName,
                vendorId,
            );

            transactions.push({ type, date, value, vendorId, productId });
        }
        return transactions;
    }
}
