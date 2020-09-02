import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagDto, UserTagDto } from './tag.dto';
import { Taglist } from './taglist.entity';
import { throwError } from 'rxjs';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { ListenOptions } from 'net';
import { ListOptionsInterface } from 'src/core/interface/list-options.interface';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Taglist)
    private readonly tagListRepository: Repository<Taglist>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async store(data: TagDto) {
    return await this.tagRepository.save(data);
  }

  async storeTaglist(data: Taglist) {
    return await this.tagListRepository.save(data);
  }

  async storePostTag(postId: number, tagId: number) {
    try {
      await this.tagRepository
        .createQueryBuilder()
        .relation(Post, 'tags')
        .of(postId)
        .add(tagId);
    } catch {
      await this.tagRepository
        .createQueryBuilder()
        .relation(Post, 'tags')
        .of(postId)
        .remove(tagId);
    }
  }

  async storeUserTag(userId: number, data: any) {
    if (data.length == 0) {
      try {
        await this.tagRepository
          .createQueryBuilder()
          .relation(User, 'tags')
          .of(userId)
          .add(data[0]);

        const id = data[0];

        await this.tagRepository
          .createQueryBuilder('tag')
          .update(Tag)
          .where('tag.id=:id', { id })
          .set({ interest: () => 'interest + 1' })
          .execute();
      } catch {
        return;
      }
    } else {
      data.map(async e => {
        try {
          await this.tagRepository
            .createQueryBuilder()
            .relation(User, 'tags')
            .of(userId)
            .add(e);

          const id = e;
          await this.tagRepository
            .createQueryBuilder('tag')
            .update(Tag)
            .where('tag.id=:id', { id })
            .set({ interest: () => 'interest + 1' })
            .execute();
        } catch {
          return;
        }
      });
    }
  }

  async deleteUserTag(tagId: number, userId: number) {
    await this.tagRepository
      .createQueryBuilder()
      .relation(User, 'tags')
      .of(userId)
      .remove(tagId);

    await this.tagRepository
      .createQueryBuilder('tag')
      .update(Tag)
      .where('tag.id=:tagId', { tagId })
      .set({ interest: () => 'interest - 1' })
      .execute();
  }

  async showUserTag(userId: number) {
    return await this.userRepository
      .createQueryBuilder()
      .relation(User, 'tags')
      .of(userId)
      .loadMany();
  }

  // 标签id
  async showTagPost(id: number, options: ListOptionsInterface) {
    let {
      categories,
      tags,
      taglist,
      listId,
      collection,
      page,
      type,
      limit,
      sort,
      order,
      random,
      avator,
    } = options;

    const count = await this.userRepository
      .createQueryBuilder('tag')
      .addSelect('tag.description')
      .relation(Tag, 'posts')
      .of(id)
      .loadMany();

    const res = await this.postRepository
      .createQueryBuilder('post')

      .leftJoinAndSelect('post.user', 'user')
      .where('post.isPublished =1')
      .leftJoinAndSelect('user.avator', 'avator')
      .having('tags.Id=:id', { id })
      .leftJoinAndSelect('post.tags', 'tags')
      .orderBy('post.created', 'DESC')
      .take(limit)
      .skip(limit * (page - 1))
      .getMany();

    const returnValue = [res, count.length];

    return returnValue;
  }

  async showTagInfo(id: number) {
    const res1 = await this.userRepository
      .createQueryBuilder('tag')
      .addSelect('tag.description')
      .relation(Tag, 'user')
      .of(id)
      .loadMany();

    const res2 = await this.tagRepository
      .createQueryBuilder('tag')
      .addSelect('tag.description')
      .where('tag.id=:id', { id })
      .getOne();
    return { info: res2, count: res1.length };
  }

  async updata(id: number, data: TagDto) {
    return await this.tagRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.tagRepository.delete(id);
  }

  async showHotTag() {
    return await this.tagRepository
      .createQueryBuilder('tag')
      .take(16)
      .orderBy('tag.interest', 'DESC')
      .getMany();
  }

  async listInit() {
    const list = [
      { name: '开发语言', alias: 'language' },
      { name: '前端开发', alias: 'frontEnd' },
      { name: '后端开发', alias: 'backEnd' },
      { name: '数据库', alias: 'database' },
      { name: '开发工具', alias: 'tools' },
      { name: '云计算', alias: 'cloudcomputing' },
      { name: '服务器', alias: 'server' },
      { name: 'Javascript开发', alias: 'javascript' },
      { name: '小程序开发', alias: 'miniprogram' },
    ];
    list.map(async e => {
      try {
        await this.tagListRepository.save({
          name: e.name,
          alias: e.alias,
        });
      } catch {
        const entity = await this.tagListRepository.find({
          where: { name: e.name },
        });

        await this.tagListRepository.update(entity[0].id, {
          name: e.name,
          alias: e.alias,
        });
      }
    });
  }

  async getTags() {
    return await this.tagListRepository
      .createQueryBuilder('taglist')
      .leftJoinAndSelect('taglist.tags', 'tags')
      .orderBy('taglist.id', 'ASC')
      .getMany();
  }

  async tagsInit() {
    const tags = [
      { name: 'java', description: '', taglist: '开发语言' },
      { name: 'c', description: '', taglist: '开发语言' },
      { name: 'c++', description: '', taglist: '开发语言' },
      { name: 'php', description: '', taglist: '开发语言' },
      { name: 'python', description: '', taglist: '开发语言' },
      { name: 'javascript', description: '', taglist: '开发语言' },
      { name: 'typescript', description: '', taglist: '开发语言' },
      { name: 'html', description: '', taglist: '前端开发' },
      { name: 'nuxt.js', description: '', taglist: '前端开发' },
      { name: 'html5', description: '', taglist: '前端开发' },
      { name: 'css3', description: '', taglist: '前端开发' },
      { name: 'jquery', description: '', taglist: '前端开发' },
      { name: 'json', description: '', taglist: '前端开发' },
      { name: 'axios', description: '', taglist: '前端开发' },
      { name: 'vue.js', description: '', taglist: '前端开发' },
      { name: 'mysql', description: '', taglist: '数据库' },
      { name: 'mongodb', description: '', taglist: '数据库' },
      { name: 'visual-studio', description: '', taglist: '开发工具' },
      { name: 'docker', description: '', taglist: '开发工具' },
      { name: 'git', description: '', taglist: '开发工具' },
      { name: 'git-hub', description: '', taglist: '开发工具' },
      { name: '阿里云', description: '', taglist: '云计算' },
      { name: '腾讯云', description: '', taglist: '云计算' },
      { name: 'linux', description: '', taglist: '服务器' },
      { name: 'ubunto', description: '', taglist: '服务器' },
      { name: 'centos', description: '', taglist: '服务器' },
      { name: 'apache', description: '', taglist: '服务器' },
      { name: 'nginx', description: '', taglist: '服务器' },
      { name: 'javascript', description: '', taglist: 'JavaScript开发' },
      { name: 'node.js', description: '', taglist: 'JavaScript开发' },
      { name: 'firefox', description: '', taglist: 'JavaScript开发' },
      { name: 'chrome', description: '', taglist: 'JavaScript开发' },
      { name: '微信小程序', description: '', taglist: '小程序开发' },
      { name: 'nestjs', description: '', taglist: '后端开发' },
    ];

    tags.map(async e => {
      const name = e.taglist;
      const taglist = await this.tagListRepository
        .createQueryBuilder()
        .where('name=:name', { name })
        .getOne();
      try {
        await this.tagRepository.save({
          name: e.name,
          description: e.description,
          taglist,
        });
      } catch {
        throwError;
      }
    });
  }
}
