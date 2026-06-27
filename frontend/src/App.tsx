import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { GameGrid } from './components/GameGrid';
import { Checkout } from './components/Checkout';
import { GamePage } from './components/GamePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>

          <div className="app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<><HeroBanner /><GameGrid /></>} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/games/:id" element={<GamePage />} />
              </Routes>
            </main>
            <footer className="footer">
              <div className="footer-inner">
                <span className="footer-brand">PixelGate Game Store</span>
                <span className="footer-copy">© 2026 — All rights reserved</span>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
