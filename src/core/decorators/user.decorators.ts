import { createParamDecorator } from "@nestjs/common";
//导出一个参数装饰器@user()=req.user
export const User = createParamDecorator((date, req) =>
    req.user
)