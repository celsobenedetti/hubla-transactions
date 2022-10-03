import { faker } from "@faker-js/faker";

export class ProductFactory {
    constructor() {}

    newMockProduct({} = {}) {
        let id = +faker.random.numeric(3);
        let name = faker.name.firstName();
        let vendorId = +faker.random.numeric(3);

        return { id, name, vendorId };
    }
}
