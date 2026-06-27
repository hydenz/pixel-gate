import { useQuery } from '@tanstack/react-query';
import { fetchGames, fetchGame } from '../api/games';
import type { GetGamesDto } from '../types/game';

export function useGames() {
  return useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });
}

export function useGame(id: number) {
  return useQuery<GetGamesDto | null>({
    queryKey: ['game', id],
    queryFn: () => fetchGame(id),
    enabled: id > 0,
  });
}
