import { UserAction } from 'src/core/enums/useraction.enum';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Collection } from '../collection/collection.entity';

export class ActionDto {
  readonly from_uid: User;
  readonly to_uid: User;

  readonly to_Post: number;

  readonly to_Collection: Collection;
}
