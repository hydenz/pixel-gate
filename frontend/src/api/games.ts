import { apiClient } from './client';
import type { GetGamesDto } from '../types/game';

export async function fetchGames(): Promise<GetGamesDto[]> {
  const { data } = await apiClient.get<GetGamesDto[]>('/Games');
  return data;
}

export async function fetchGame(id: number): Promise<GetGamesDto | null> {
  const { data } = await apiClient.get<GetGamesDto | null>(`/Games/${id}`);
  return data;
}
