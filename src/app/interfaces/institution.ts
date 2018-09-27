export interface Institution {
  id: number;
  totalMerchant?: number;
  totalLocation?: number;
  totalDevice?: number;
  code: string;
  name: string;
  description: string;
  activateOn: string;
  expiryOn: string;
  status: boolean;
  institutionDetail: InstitutionDetail;
}

export interface InstitutionDetail {
  email: string;
  phone: string;
  fax: string;
  address1: string;
  address2: string;
  city: string;
  country: Object;
  countryState: Object;
  zip: string;
}
