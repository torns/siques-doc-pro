import { Controller, Get, UseInterceptors, Post } from '@nestjs/common';
import { PutcodeInterceptor } from 'src/core/interceptors/putcode.interceptor';
import { GetCodeInterceptor } from 'src/core/interceptors/getcode.interceptor';
import { AppService } from 'src/app.service';

@Controller('sms')
export class SmsController {

    constructor(
        private readonly appService: AppService
    ) { }

    @Get('put')
    @UseInterceptors(PutcodeInterceptor)
    async testCode() {

        const rep = {
            name: '你好',
            code: await this.appService.createdCode()
        };
        return rep;
    }

    @Post('test')
    @UseInterceptors(GetCodeInterceptor)
    async test() {
    }

}
