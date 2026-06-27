import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { GetGamesDto, Platform, CartItem } from '../types/game';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number; platform: Platform } }
  | { type: 'CLEAR' };

interface CartContextValue {
  items: CartItem[];
  addItem: (game: GetGamesDto, platform: Platform) => void;
  removeItem: (id: number, platform: Platform) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
  inCart: (id: number, platform: Platform) => boolean;
}

const STORAGE_KEY = 'pixelgate-cart';

function itemKey(item: CartItem): string {
  return `${item.game.id}-${item.platform}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      if (state.items.some((i) => itemKey(i) === itemKey(action.payload))) {
        return state;
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => !(i.game.id === action.payload.id && i.platform === action.payload.platform)) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

function loadCart(): CartState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return { items: parsed };
    }
  } catch { /* ignore */ }
  return { items: [] };
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (game: GetGamesDto, platform: Platform) =>
    dispatch({ type: 'ADD_ITEM', payload: { game, platform } });
  const removeItem = (id: number, platform: Platform) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id, platform } });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const inCart = (id: number, platform: Platform) =>
    state.items.some((i) => i.game.id === id && i.platform === platform);

  const itemCount = state.items.length;
  const total = state.items.reduce((sum, i) => sum + i.game.price, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, clearCart, itemCount, total, inCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
