import { Body, Controller, Post } from '@nestjs/common';
import { LanguageDto } from './dto/language.dto';
import { Language } from './language.entity';
import { LanguageService } from './language.service';

@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Post()
  async createLanguage(@Body() dto: LanguageDto): Promise<Language> {
    return await this.languageService.createLanguage(dto);
  }
}
