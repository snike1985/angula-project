import { Currency } from './currency';

export interface Country {
  id: number;
  code: string;
  countryName: string;
  currency: Currency;
  isoCode: string;
  isdCode: string;
  active: boolean;
}
