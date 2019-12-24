import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  readonly title: string;
  @ApiProperty({ description: '文章内容' })
  readonly body: string;
  readonly category: Category;

  tags: Tag[];
}
