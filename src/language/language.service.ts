import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { LanguageDto } from './dto/language.dto';
import { Language } from './language.entity';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguageService {
  private languageRepository: LanguageRepository;

  constructor(private connection: Connection) {
    this.languageRepository =
      this.connection.getCustomRepository(LanguageRepository);
  }

  async createLanguage(dto: LanguageDto): Promise<Language> {
    return await this.languageRepository.createLanguage(dto);
  }
}
