import { IsString, MaxLength } from 'class-validator';

export class LanguageDto {
  @IsString()
  @MaxLength(20)
  name: string;
}
