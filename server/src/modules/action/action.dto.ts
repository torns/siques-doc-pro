import { UserAction } from 'src/core/enums/useraction.enum';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Collection } from '../collection/collection.entity';

export class ActionDto {
  readonly from_uid: User;
  readonly content: string;
  readonly to_uid: User;
  readonly alias: string;
  readonly to_Post: any;

  readonly to_Collection: Collection;
}
