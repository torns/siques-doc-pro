import { Posttype } from 'src/core/enums/posttype.enum';

export class CollectionDto {
  readonly name: string;
  readonly type: Posttype;
}
