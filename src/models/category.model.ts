import { Service } from './service.model.js';

export interface Category {
  cat_id: string;
  cat: string;
  services: Service[];
}