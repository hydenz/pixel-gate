import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGames';
import { useCart } from '../context/CartContext';
import { platformIcons, platformColors } from '../types/game';
import type { Platform } from '../types/game';

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: game, isLoading, error } = useGame(Number(id));
  const { addItem, inCart } = useCart();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  if (isLoading) {
    return (
      <div className="game-page">
        <div className="game-page-container">
          <div className="game-page-loading">
            <div className="spinner" />
            <p>Loading game...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="game-page">
        <div className="game-page-container">
          <div className="game-page-error">
            <span className="error-icon">⚠️</span>
            <h2>Game not found</h2>
            <p>The game you're looking for doesn't exist.</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  const platform = selectedPlatform ?? game.platforms[0];
  const isInCart = inCart(game.id, platform);

  const handleAddToCart = () => addItem(game, platform);
  const handleBuyNow = () => {
    addItem(game, platform);
    navigate('/checkout');
  };

  return (
    <div className="game-page">
      <div className="game-page-container">
        <button className="game-page-back" onClick={() => navigate('/')}>
          ← Back to Store
        </button>

        <div className="game-page-layout">
          <div className="game-page-cover">
            {game.coverImageUrl ? (
              <img src={game.coverImageUrl} alt={game.name} />
            ) : (
              <div className="game-page-placeholder">🎮</div>
            )}
          </div>

          <div className="game-page-info">
            <div className="game-page-meta">
              <span className="modal-genre">{game.genreName}</span>
              {game.platforms.map((p) => (
                <span
                  key={p}
                  className="modal-platform"
                  style={{ backgroundColor: platformColors[p] + '22', color: platformColors[p] }}
                >
                  {platformIcons[p]} {p}
                </span>
              ))}
            </div>

            <h1 className="game-page-title">{game.name}</h1>
            <p className="game-page-company">{game.companyName}</p>

            <div className="game-page-price-section">
              {game.price === 0 ? (
                <span className="free-large">Free to Play</span>
              ) : (
                <span className="price-large">${game.price.toFixed(2)}</span>
              )}
              {!game.isAvailable && <span className="coming-soon">Coming Soon</span>}
            </div>

            <p className="game-page-description">{game.description}</p>

            <div className="game-page-details-grid">
              <div className="detail-item">
                <span className="detail-label">Release Date</span>
                <span className="detail-value">{new Date(game.releaseDate + 'T00:00:00').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Publisher</span>
                <span className="detail-value">{game.companyName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Genre</span>
                <span className="detail-value">{game.genreName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Platforms</span>
                <span className="detail-value">{game.platforms.join(', ')}</span>
              </div>
            </div>

            <div className="game-page-buy-section">
              <select
                className="platform-select"
                value={platform}
                onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
              >
                {game.platforms.map((p) => (
                  <option key={p} value={p}>{platformIcons[p]} {p}</option>
                ))}
              </select>
              <div className="game-page-buy-buttons">
                <button
                  className="btn-buy"
                  disabled={!game.isAvailable}
                  onClick={handleAddToCart}
                >
                  {isInCart ? 'In Cart ✓' : 'Add to Cart'}
                </button>
                <button
                  className="btn-buy-now"
                  disabled={!game.isAvailable}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
