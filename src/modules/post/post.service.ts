import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) { }

    async store(data: PostDto, user: User) {
        const entity = await this.postRepository.create(data);
        await this.postRepository.save({
            ...entity,
            user
        })
        return entity
    }

    async index() {
        const entites = await this.postRepository.find({
            relations: ["user"]
        });
        return entites
    }

    async show(id: string) {
        const entites = await this.postRepository.findOne(id)
        return entites
    }

    async update(id: string, data: Partial<PostDto>) {

        const entites = await this.postRepository.update(id, data)
        return entites
    }

    async delete(id: string) {
        const res = await this.postRepository.delete(id)
        return res
    }

    async vote(id: number, user: User) {
        await this.postRepository
            .createQueryBuilder()
            .relation(User, "voted")
            .of(user)
            .add(id);
    }

    async unvote(id: number, user: User) {
        await this.postRepository
            .createQueryBuilder()
            .relation(User, "voted")
            .of(user)
            .remove(id);
    }

    async liked(id: number) {
        return await this.postRepository
            .createQueryBuilder()
            .relation(Post, "liked")
            .of(id)
            .loadMany();
    }

}
