import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCart } from '../context/CartContext';
import type { GetGamesDto } from '../types/game';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const searchRef = useRef<HTMLDivElement>(null);

  const games = queryClient.getQueryData<GetGamesDto[]>(['games']);
  const results: GetGamesDto[] = query.trim()
    ? (games ?? []).filter((g) =>
        g.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const selectGame = (game: GetGamesDto) => {
    setQuery('');
    setShowResults(false);
    navigate(`/games/${game.id}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="navbar-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
              <path d="M10 22V10l12 6-12 6z" fill="#fff" />
              <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#7c3aed" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="navbar-title">PixelGate</span>
        </div>

        <button className="btn-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <path d="M6 18L18 6M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </>
            )}
          </svg>
        </button>

        {menuOpen && <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />}

        <div className={`navbar-links${menuOpen ? ' navbar-links--open' : ''}`}>
          <a href="/" className="nav-link active" onClick={() => setMenuOpen(false)}>Browse</a>
          <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>New Releases</a>
          <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>Deals</a>
          <a href="/" className="nav-link" onClick={() => setMenuOpen(false)}>Library</a>
        </div>

        <div className="navbar-search" ref={searchRef}>
          <form onSubmit={handleSubmit}>
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search games..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
          </form>
          {showResults && results.length > 0 && (
            <div className="search-results">
              {results.map((game) => (
                <div
                  key={game.id}
                  className="search-result-item"
                  onClick={() => selectGame(game)}
                >
                  <div className="search-result-cover">
                    {game.coverImageUrl ? (
                      <img src={game.coverImageUrl} alt={game.name} />
                    ) : (
                      <span>🎮</span>
                    )}
                  </div>
                  <div className="search-result-info">
                    <span className="search-result-name">{game.name}</span>
                    <span className="search-result-meta">{game.genreName} · ${game.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showResults && query.trim() && results.length === 0 && (
            <div className="search-results">
              <div className="search-no-results">No games found</div>
            </div>
          )}
        </div>

        <div className="navbar-actions">
          <button className="btn-cart" onClick={() => navigate('/checkout')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
          <div className="avatar">M</div>
        </div>
      </div>
    </nav>
  );
}
