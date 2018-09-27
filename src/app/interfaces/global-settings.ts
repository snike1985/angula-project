export interface GlobalSettings {
  settingDto: SettingDto;
  pagination: string[];
  language: string[];
  searchOption: string[];
}

export interface SettingDto {
    id: number;
    search: string;
    language: string;
    pagination: string;
}
