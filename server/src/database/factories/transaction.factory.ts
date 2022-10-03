import { faker } from "@faker-js/faker";

export class TransactionFactory {
    constructor() {}

    newMockTransactionString({ invalid } = { invalid: false }) {
        const type = faker.random.numeric(1);
        const date = new Date().toISOString();
        const productName = faker.random.numeric(30);
        const value = faker.random.numeric(10);
        const vendorName = faker.random.numeric(20);
        if (invalid) return "" + date + productName + value;
        return "" + type + date + productName + value + vendorName;
    }

    newMockTransaction({} = {}) {
        let id = +faker.random.numeric(3);
        let name = faker.name.firstName();

        return { id, name };
    }
}
