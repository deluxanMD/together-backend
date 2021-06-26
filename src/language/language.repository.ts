import { EntityRepository, Repository } from 'typeorm';
import { LanguageDto } from './dto/language.dto';
import { Language } from './language.entity';

@EntityRepository(Language)
export class LanguageRepository extends Repository<Language> {
  capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async getLanguages(): Promise<Language[]> {
    return await this.find();
  }

  async createLanguage(dto: LanguageDto): Promise<Language> {
    const { name } = dto;

    const languages = await this.getLanguages();

    const found = languages.find(
      (lang) => lang.name.toLowerCase() === name.toLowerCase(),
    );

    if (found) {
      throw new Error(`Language already in database`);
    }

    const language = new Language();

    language.name = this.capitalize(name);
    language.total_enquiry = 0;
    language.solved_enquiry = 0;

    await language.save();

    return language;
  }
}
