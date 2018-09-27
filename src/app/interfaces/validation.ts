export interface ValidationError {
  id: number;
  code: string;
  value: string;
}

export interface ValidationSuccessInstitution {
  name: string;
  merchants: ValidationSuccessMerchant[];
}
export interface ValidationSuccessMerchant {
  name: string;
  locations: ValidationSuccessLocation[];
}
export interface ValidationSuccessLocation {
  name: string;
  devices: string[];
}

export interface ValidationSuccess {
  institutions: ValidationSuccessInstitution[];
}
