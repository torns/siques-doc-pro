export interface ListOptionsInterface {
  categories: string;
  tags: string;
  limit: number;
  page: number;
  sort: string;
  taglist: string;
  order: 'ASC' | 'DESC';
}
