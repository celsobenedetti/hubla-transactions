import { Product } from "@prisma/client";

export class CreateTransactionDto {
    type: string;
    date: Date;
    productId: number;
    value: number;
    vendorId: number;
}
