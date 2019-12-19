import { createParamDecorator } from "@nestjs/common";
//导出一个参数装饰器@user()=req.user
export const ListOptions = createParamDecorator((date, req) =>{

        let {categories,tags} = req.query;
        if(categories){
            categories = categories.split("-");
        }

        if(tags){
            tags = tags.split("-")
        }
        return {
            categories,
            tags
        }

    })