import { faker } from "@faker-js/faker";

export class UserFactory {
    constructor() { }

    newMockJwt() {
        return {
            id: +faker.random.numeric(3),
            username: faker.name.firstName(),
        };
    }

    newMockUser({ } = {}) {
        let id = +faker.random.numeric(3);
        let username = faker.name.firstName();
        let password = faker.random.alphaNumeric(5);

        return {
            id,
            username,
            password,
        };
    }
}
