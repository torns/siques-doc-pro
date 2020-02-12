import { Tag } from './tag.entity';
import { Taglist } from './taglist.entity';

export class TagDto {
  readonly name: string;
  readonly alias: string;
  readonly description: string;
  readonly taglist: Taglist;
}

export class UserTagDto {
  readonly tagId: Tag[];
}
