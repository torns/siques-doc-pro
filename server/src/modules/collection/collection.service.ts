import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CollectionDto } from './collection.dto';

@Injectable()
export class CollectionService {
    constructor(
        @InjectRepository(Collection)
        private readonly CollectionRepository: Repository<Collection>
    ) { }

    async store(user: User, data: CollectionDto) {

        return await this.CollectionRepository.save({
            user,
            ...data,
        });
    }
    async showCollection(id: number) {


        return await this.CollectionRepository
            .createQueryBuilder('collection')
            .where('userId=:id', { id })
            .getMany();
    }

    async removeCollection(id: number) {
        return await this.CollectionRepository.delete(id)
    }

}
