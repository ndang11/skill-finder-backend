import { Injectable } from '@nestjs/common';
import en from './locales/en.json' with { type: 'json' };
import fr from './locales/fr.json' with { type: 'json' };

@Injectable()
export class I18nService {
  private readonly locales: Record<string, Record<string, string>> = {
    en,
    fr,
  };

  translate(key: string, lang = 'en'): string {
    const targetLang = lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
    const dict = this.locales[targetLang] || this.locales.en;
    return dict[key] || key;
  }
}
