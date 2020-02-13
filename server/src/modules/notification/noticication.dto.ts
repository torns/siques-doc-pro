import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';

export class NotificationDto {
  readonly content: string;
  readonly alias: string;
  readonly to_uid: User;
  readonly from_uid: User;
  readonly to_Post: Post;
  readonly type: string;
}
