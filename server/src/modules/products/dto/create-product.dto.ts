export class CreateProductDto {
    name: string;
    vendorId: number;

    constructor(name: string, vendorId: number) {
        this.name = name;
        this.vendorId = vendorId;
    }
}
