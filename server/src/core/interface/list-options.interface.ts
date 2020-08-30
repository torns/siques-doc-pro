import { Posttype } from '../enums/posttype.enum';

export interface ListOptionsInterface {
  categories: string;
  tags: string;
  limit: number;
  page: number;
  sort: string;
  taglist: string;
  listId: boolean;
  type: Posttype;
  collection: boolean;
  random: boolean;
  order: 'ASC' | 'DESC';
}
