export interface Currency {
  id: number;
  code: string;
  isoCode: number;
  currencyName: string;
  active?: boolean;
  currencyMinorUnit?: string;
}
