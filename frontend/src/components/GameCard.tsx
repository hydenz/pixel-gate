import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GetGamesDto } from '../types/game';

interface GameCardProps {
  game: GetGamesDto;
}

const placeholderColors = [
  'from-violet-600 to-indigo-700',
  'from-cyan-600 to-blue-700',
  'from-rose-600 to-pink-700',
  'from-amber-600 to-orange-700',
  'from-emerald-600 to-teal-700',
  'from-fuchsia-600 to-purple-700',
];

export function GameCard({ game }: GameCardProps) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const colorIndex = game.id % placeholderColors.length;

  return (
    <article className="game-card" onClick={() => navigate(`/games/${game.id}`)}>
      <div className="game-card-cover">
        {game.coverImageUrl && !imgError ? (
          <img
            src={game.cardImageUrl ?? game.coverImageUrl}
            alt={game.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`game-card-placeholder bg-gradient-to-br ${placeholderColors[colorIndex]}`}>
            <span className="placeholder-icon">🎮</span>
            <span className="placeholder-text">{game.name}</span>
          </div>
        )}
        <div className="game-card-overlay">
          <span className="view-details">View Details</span>
        </div>
      </div>

      <div className="game-card-body">
        <div className="game-card-header">
          <span className="game-genre">{game.genreName}</span>
        </div>
        <h3 className="game-title">{game.name}</h3>
        <p className="game-company">{game.companyName}</p>
        <div className="game-card-footer">
          <span className="game-price">
            {game.price === 0 ? (
              <span className="free-badge">Free</span>
            ) : (
              <>
                <span className="currency">$</span>
                {game.price.toFixed(2)}
              </>
            )}
          </span>
          {!game.isAvailable && <span className="unavailable-badge">Coming Soon</span>}
        </div>
      </div>
    </article>
  );
}
