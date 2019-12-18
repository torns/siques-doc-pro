import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository:Repository<Post>
    ){}

    async store(data:PostDto){
        const res = await this.postRepository.create(data);
        await this.postRepository.save(res)
        return res
    }

    async index(){
        const entites = await this.postRepository.find();
        return entites
    }

    async show(id:string){
        const entites = await this.postRepository.findOne(id)
        return entites
    }

    async update(id:string,data:Partial<PostDto>){
        
        const entites = await this.postRepository.update(id,data)
        return entites
    }

    async delete(id:string){
        const res = await this.postRepository.delete(id)
        return res
    }

}
