var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import en from './locales/en.json' with { type: 'json' };
import fr from './locales/fr.json' with { type: 'json' };
let I18nService = class I18nService {
    locales = {
        en,
        fr,
    };
    translate(key, lang = 'en') {
        const targetLang = lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
        const dict = this.locales[targetLang] || this.locales.en;
        return dict[key] || key;
    }
};
I18nService = __decorate([
    Injectable()
], I18nService);
export { I18nService };
//# sourceMappingURL=i18n.service.js.map