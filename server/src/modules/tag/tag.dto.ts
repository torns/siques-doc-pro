import { Tag } from './tag.entity';

export class TagDto {
  readonly name: string;
  readonly alias: string;
  readonly description: string;
}

export class UserTagDto {
  readonly tagId: Tag[];
}
