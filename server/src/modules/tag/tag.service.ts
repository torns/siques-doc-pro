import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { TagDto } from './tag.dto';
import { Taglist } from './taglist.entity';
import { throwError } from 'rxjs';
import { Post } from '../post/post.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Taglist)
    private readonly tagListRepository: Repository<Taglist>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async store(data: TagDto) {
    return await this.tagRepository.save(data);
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

  async updata(id: number, data: TagDto) {
    return await this.tagRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.tagRepository.delete(id);
  }

  async listInit() {
    const list = [
      '开发语言',
      '前端开发',
      '数据库',
      '开发工具',
      '云计算',
      '服务器',
      'JavaScript开发',
      '小程序开发',
    ];
    list.map(async e => {
      await this.tagListRepository.save({
        name: e,
      });
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
