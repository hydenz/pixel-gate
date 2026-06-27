export type Platform = 'PC' | 'PS5' | 'XboxSeriesX' | 'NintendoSwitch';

export interface GetGamesDto {
  id: number;
  name: string;
  description: string;
  genreId: number;
  genreName: string;
  releaseDate: string;
  companyId: number;
  companyName: string;
  price: number;
  isAvailable: boolean;
  coverImageUrl: string | null;
  cardImageUrl: string | null;
  platforms: Platform[];
}

export interface Game {
  id: number;
  name: string;
  description: string;
  genreId: number;
  genre: Genre | null;
  releaseDate: string;
  companyId: number;
  company: Company | null;
  price: number;
  isAvailable: boolean;
  coverImageUrl: string | null;
  platforms: Platform[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
}

export interface CartItem {
  game: GetGamesDto;
  platform: Platform;
}

export const platformIcons: Record<Platform, string> = {
  PC: '🖥',
  PS5: '🎮',
  XboxSeriesX: '🎯',
  NintendoSwitch: '🕹',
};

export const platformColors: Record<Platform, string> = {
  PC: '#00d4ff',
  PS5: '#003087',
  XboxSeriesX: '#107c10',
  NintendoSwitch: '#e60012',
};
