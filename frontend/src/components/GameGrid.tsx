import { useState, useMemo } from 'react';
import { useGames } from '../hooks/useGames';
import { GameCard } from './GameCard';
import type { Platform } from '../types/game';

export function GameGrid() {
  const { data: games, isLoading, error } = useGames();
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');

  const filteredGames = useMemo(() => {
    if (!games) return [];
    return games.filter((g) => {
      if (platformFilter !== 'all' && !g.platforms.includes(platformFilter as Platform)) return false;
      if (genreFilter !== 'all' && g.genreName !== genreFilter) return false;
      return true;
    });
  }, [games, platformFilter, genreFilter]);

  const platforms = useMemo(() => {
    if (!games) return ['all'];
    const set = new Set(games.flatMap((g) => g.platforms));
    return ['all', ...Array.from(set)];
  }, [games]);

  const genres = useMemo(() => {
    if (!games) return ['all'];
    const set = new Set(games.map((g) => g.genreName));
    return ['all', ...Array.from(set)];
  }, [games]);

  if (isLoading) {
    return (
      <section className="game-section">
        <div className="section-header">
          <h2>All Games</h2>
        </div>
        <div className="loading-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-img" />
              <div className="skeleton-body">
                <div className="skeleton-line short" />
                <div className="skeleton-line medium" />
                <div className="skeleton-line long" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="game-section">
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <h3>Failed to load games</h3>
          <p>Make sure the backend server is running on port 5162</p>
        </div>
      </section>
    );
  }

  return (
    <section className="game-section">
      <div className="section-header">
        <h2>All Games <span className="count-badge">{games?.length ?? 0}</span></h2>
        <div className="filters">
          <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)} className="filter-select">
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p === 'all' ? 'All Platforms' : p}
              </option>
            ))}
          </select>
          <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)} className="filter-select">
            {genres.map((g) => (
              <option key={g} value={g}>
                {g === 'all' ? 'All Genres' : g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="game-grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="empty-state">
          <p>No games match the selected filters.</p>
        </div>
      )}
    </section>
  );
}
