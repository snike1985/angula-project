import { Country } from './country';

export interface CountryState {
  id: number;
  code: string;
  stateName: string;
  country: Country;
  active: boolean;

}
