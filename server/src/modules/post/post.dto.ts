import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  readonly title: string;
  @ApiProperty({ description: '文章内容' })
  readonly body: string;
  readonly editor: boolean;
  readonly category: Category;
  readonly counts: number;

  tags: Tag[];
}
