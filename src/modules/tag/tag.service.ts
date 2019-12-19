import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository:Repository<Tag>
    ){}

    async store(data:TagDto){
        return await this.tagRepository.save(data);

    }

    async updata(id:number,data:TagDto){
        return await this.tagRepository.update(id,data);
    }
    
    async delete(id:number){
        return await this.tagRepository.delete(id)
    }
}
