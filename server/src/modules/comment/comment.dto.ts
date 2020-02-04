import { Commentype } from 'src/core/enums/commentype.enum';

export class CommentDto {
  readonly title: string;
  readonly body: string;
  readonly parentid: string;
  //拥有这个资源的用户id
  readonly owner_uid: string;
  readonly type: Commentype;
}
