export interface ListOptionsInterface {
  categories: string;
  tags: string;
  limit: number;
  page: number;
  sort: string;
  taglist: string;
  listId: boolean;
  type: string;
  collection: boolean;
  order: 'ASC' | 'DESC';
}
