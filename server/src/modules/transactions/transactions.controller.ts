import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { TransactionsService } from "./transactions.service";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { AllowUnauthorizedRequest } from "src/common/decorators";

@Controller("transactions")
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @UseInterceptors(FileInterceptor("file"))
    @Post("upload")
    @AllowUnauthorizedRequest()
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("We didn't manage to catch the file, please try again");
        }
        return this.transactionsService.createMany(file.buffer.toString());
    }

    @Get()
    @AllowUnauthorizedRequest()
    findAll() {
        return this.transactionsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.transactionsService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionsService.update(+id, updateTransactionDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.transactionsService.remove(+id);
    }
}
