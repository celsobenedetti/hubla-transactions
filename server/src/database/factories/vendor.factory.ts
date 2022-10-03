import { faker } from "@faker-js/faker";

export class VendorFactory {
    constructor() {}

    newMockVendor({} = {}) {
        let id = +faker.random.numeric(3);
        let name = faker.name.firstName();

        return { id, name };
    }
}
