import { Controller } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}
}
