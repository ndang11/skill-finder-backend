import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateCategoryDto } from './dto/create-category.dto.js';

const STATIC_CATEGORIES = [
  { id: 'electrician', name: 'Electrician', nameFr: 'Électricien', slug: 'electrician', sector: 'Vocational & Construction', source: 'MINEFOP' },
  { id: 'plumber', name: 'Plumber', nameFr: 'Plombier-Sanitaire', slug: 'plumber', sector: 'Vocational & Construction', source: 'MINEFOP' },
  { id: 'mason', name: 'Mason / Bricklayer', nameFr: 'Maçon / Carreleur', slug: 'mason-bricklayer', sector: 'Vocational & Construction', source: 'MINEFOP' },
  { id: 'carpenter', name: 'Carpenter & Woodworker', nameFr: 'Menuisier - Ébéniste', slug: 'carpenter-woodworker', sector: 'Vocational & Construction', source: 'Artisanal Chamber (CMA)' },
  { id: 'painter', name: 'Painter & Decorator', nameFr: 'Peintre en Bâtiment', slug: 'painter-decorator', sector: 'Vocational & Construction', source: 'Artisanal Chamber (CMA)' },
  { id: 'welder', name: 'Welder & Metal Fabricator', nameFr: 'Soudeur - Ferronnier', slug: 'welder-metal-fabricator', sector: 'Vocational & Construction', source: 'MINEFOP' },
  { id: 'mechanic', name: 'Auto Mechanic', nameFr: 'Mécanicien Auto', slug: 'auto-mechanic', sector: 'Automotive & Machinery', source: 'MINEFOP' },
  { id: 'auto-electrician', name: 'Auto Electrician', nameFr: 'Électricien Auto', slug: 'auto-electrician', sector: 'Automotive & Machinery', source: 'MINEFOP' },
  { id: 'motorbike-mechanic', name: 'Motorbike & Tricycle Mechanic', nameFr: 'Mécanicien Moto / Keke', slug: 'motorbike-tricycle-mechanic', sector: 'Automotive & Machinery', source: 'Bayam-Sellam & Street Tech' },
  { id: 'generator-tech', name: 'Generator & Pump Technician', nameFr: 'Technicien Groupes & Pompes', slug: 'generator-pump-technician', sector: 'Automotive & Machinery', source: 'MINEFOP' },
  { id: 'phone-repair', name: 'Phone & Laptop Hardware Repair', nameFr: 'Réparation Téléphones & PC', slug: 'phone-laptop-repair', sector: 'Tech & Digital Services', source: 'Bayam-Sellam & Street Tech' },
  { id: 'mobile-money', name: 'Mobile Money & Kiosk Agent', nameFr: 'Agent Mobile Money & Kiosque', slug: 'mobile-money-kiosk-agent', sector: 'Tech & Digital Services', source: 'Bayam-Sellam & Street Tech' },
  { id: 'solar-installer', name: 'Solar & Security Installer', nameFr: 'Installateur Solaire & Caméras', slug: 'solar-security-installer', sector: 'Tech & Digital Services', source: 'INS / FNE' },
  { id: 'ac-tech', name: 'AC & Refrigeration Tech', nameFr: 'Technicien Froid & Climatisation', slug: 'ac-refrigeration-tech', sector: 'Tech & Digital Services', source: 'MINEFOP' },
  { id: 'software-dev', name: 'Software & Mobile Developer', nameFr: 'Développeur Web & Mobile', slug: 'software-mobile-developer', sector: 'Tech & Digital Services', source: 'INS / FNE' },
  { id: 'graphic-designer', name: 'Graphic Designer & Print', nameFr: 'Infographe & Sérigraphie', slug: 'graphic-designer-print', sector: 'Tech & Digital Services', source: 'INS / FNE' },
  { id: 'tailor', name: 'Tailor & Fashion Designer', nameFr: 'Couturier & Styliste', slug: 'tailor-fashion-designer', sector: 'Fashion, Beauty & Crafts', source: 'Artisanal Chamber (CMA)' },
  { id: 'hairdresser', name: 'Hairdresser & Barber', nameFr: 'Coiffeur(se) & Esthéticienne', slug: 'hairdresser-barber', sector: 'Fashion, Beauty & Crafts', source: 'Artisanal Chamber (CMA)' },
  { id: 'shoemaker', name: 'Shoemaker & Leather Craftsman', nameFr: 'Cordonnier & Artisan Cuir', slug: 'shoemaker-leather-craftsman', sector: 'Fashion, Beauty & Crafts', source: 'Artisanal Chamber (CMA)' },
  { id: 'bayam-sellam', name: 'Bayam-Sellam & Produce Trader', nameFr: 'Bayam-Sellam & Vivres Frais', slug: 'bayam-sellam-produce-trader', sector: 'Trade, Agriculture & Food', source: 'Bayam-Sellam & Street Tech' },
  { id: 'agro-processor', name: 'Agro-Processor & Agribusiness', nameFr: 'Transformation Agroalimentaire', slug: 'agro-processor-agribusiness', sector: 'Trade, Agriculture & Food', source: 'INS / FNE' },
  { id: 'caterer', name: 'Event Caterer & Chef', nameFr: 'Traiteur & Cuisinier', slug: 'event-caterer-chef', sector: 'Trade, Agriculture & Food', source: 'Artisanal Chamber (CMA)' },
  { id: 'cleaning', name: 'Cleaning & Pest Control', nameFr: 'Nettoyage & Désinfection', slug: 'cleaning-pest-control', sector: 'Services & Maintenance', source: 'INS / FNE' },
  { id: 'security', name: 'Security & Guarding', nameFr: 'Gardiennage & Sécurité', slug: 'security-guarding', sector: 'Services & Maintenance', source: 'INS / FNE' },
  { id: 'other', name: 'Other', nameFr: 'Autre', slug: 'other', sector: 'Services & Maintenance', source: 'MINEFOP' },
];

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // Categories are managed statically for now.
    throw new ConflictException('Dynamic category creation is not supported.');
  }

  async findAll() {
    return STATIC_CATEGORIES;
  }
}
