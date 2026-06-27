export function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-badge">Summer Sale — Up to 80% Off</div>
        <h1 className="hero-title">
          Level Up Your
          <br />
          <span className="hero-highlight">Game Collection</span>
        </h1>
        <p className="hero-subtitle">
          Discover thousands of incredible games at unbeatable prices.
          From AAA blockbusters to indie gems.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">
            Explore Deals
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
          <button className="btn-secondary">View All Games</button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">2,500+</span>
            <span className="stat-label">Games Available</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">15,000+</span>
            <span className="stat-label">Happy Gamers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">4.8★</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
