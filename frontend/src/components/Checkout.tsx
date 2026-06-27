import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { platformIcons, platformColors } from '../types/game';

function luhnCheck(num: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let d = parseInt(num[i], 10);
    if (alt) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function generateFakeCC() {
  let raw: string;
  do {
    raw = '';
    for (let i = 0; i < 16; i++) raw += Math.floor(Math.random() * 10);
  } while (!luhnCheck(raw));
  const ccNum = raw.replace(/(.{4})/g, '$1 ').trim();
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const year = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1);
  const cvv = String(Math.floor(Math.random() * 900) + 100);
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Davis', 'Frank Miller'];
  const name = names[Math.floor(Math.random() * names.length)];
  return { ccNum, exp: `${month}/${year}`, cvv, name };
}

interface CCInfo {
  ccNum: string;
  exp: string;
  cvv: string;
  name: string;
}

function formatCCNum(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

function validateName(val: string): string | null {
  if (!val.trim()) return 'Cardholder name is required';
  if (val.trim().length < 2) return 'Enter a valid name';
  return null;
}

function validateCCNum(val: string): string | null {
  const digits = val.replace(/\s/g, '');
  if (!digits) return 'Card number is required';
  if (!/^\d{13,19}$/.test(digits)) return 'Invalid card number length';
  if (!luhnCheck(digits)) return 'Invalid credit card number';
  return null;
}

function validateExpiry(val: string): string | null {
  if (!val) return 'Expiry date is required';
  const parts = val.split('/');
  if (parts.length !== 2) return 'Use MM/YY format';
  const month = parseInt(parts[0], 10);
  const year = parseInt(parts[1], 10);
  if (!month || !year || month < 1 || month > 12) return 'Invalid month';
  const now = new Date();
  const curYear = now.getFullYear() % 100;
  const curMonth = now.getMonth() + 1;
  if (year < curYear || (year === curYear && month < curMonth)) return 'Card has expired';
  return null;
}

function validateCVV(val: string): string | null {
  if (!val) return 'CVV is required';
  if (!/^\d{3,4}$/.test(val)) return 'CVV must be 3 or 4 digits';
  return null;
}

export function Checkout() {
  const { items, removeItem, clearCart, total } = useCart();
  const navigate = useNavigate();
  const [cc, setCC] = useState<CCInfo>({ ccNum: '', exp: '', cvv: '', name: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = {
    name: validateName(cc.name),
    ccNum: validateCCNum(cc.ccNum),
    exp: validateExpiry(cc.exp),
    cvv: validateCVV(cc.cvv),
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const handleBlur = (field: string) => setTouched({ ...touched, [field]: true });

  const fillFake = () => {
    setCC(generateFakeCC());
    setTouched({ name: true, ccNum: true, exp: true, cvv: true });
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, ccNum: true, exp: true, cvv: true });
    if (hasErrors) return;
    setLoading(true);
    setTimeout(() => {
      setPaid(true);
      clearCart();
      setLoading(false);
    }, 1500);
  };

  if (paid) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="payment-success">
            <div className="success-icon">✓</div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your games will be available in your library.</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Back to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        {items.length === 0 ? (
          <div className="empty-checkout">
            <p>Your cart is empty.</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Browse Games
            </button>
          </div>
        ) : (
          <div className="checkout-layout">
            <div className="checkout-items">
              <h2>Cart Items ({items.length})</h2>
              {items.map((item) => (
                <div key={`${item.game.id}-${item.platform}`} className="checkout-item">
                  <div className="checkout-item-cover">
                    {item.game.coverImageUrl ? (
                      <img src={item.game.coverImageUrl} alt={item.game.name} />
                    ) : (
                      <div className="checkout-item-placeholder">🎮</div>
                    )}
                  </div>
                  <div className="checkout-item-info">
                    <h3>{item.game.name}</h3>
                    <p className="checkout-item-company">{item.game.companyName}</p>
                    <span
                      className="checkout-platform-tag"
                      style={{ backgroundColor: platformColors[item.platform] + '22', color: platformColors[item.platform] }}
                    >
                      {platformIcons[item.platform]} {item.platform}
                    </span>
                  </div>
                  <div className="checkout-item-price">${item.game.price.toFixed(2)}</div>
                  <button className="checkout-item-remove" onClick={() => removeItem(item.game.id, item.platform)}>
                    ✕
                  </button>
                </div>
              ))}

              <div className="checkout-total">
                <span>Total</span>
                <span className="checkout-total-price">${total.toFixed(2)}</span>
              </div>
            </div>

            <form className="checkout-form" onSubmit={handlePay} noValidate>
              <h2>Payment Details</h2>

              <div className="form-group">
                <label htmlFor="ccName">Cardholder Name</label>
                <input
                  id="ccName"
                  type="text"
                  placeholder="John Doe"
                  value={cc.name}
                  onChange={(e) => setCC({ ...cc, name: e.target.value })}
                  onBlur={() => handleBlur('name')}
                  className={touched.name && errors.name ? 'input-error' : ''}
                />
                {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="ccNum">Card Number</label>
                <input
                  id="ccNum"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={cc.ccNum}
                  onChange={(e) => setCC({ ...cc, ccNum: formatCCNum(e.target.value) })}
                  onBlur={() => handleBlur('ccNum')}
                  className={touched.ccNum && errors.ccNum ? 'input-error' : ''}
                />
                {touched.ccNum && errors.ccNum && <span className="field-error">{errors.ccNum}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ccExp">Expiry</label>
                  <input
                    id="ccExp"
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cc.exp}
                    onChange={(e) => setCC({ ...cc, exp: formatExpiry(e.target.value) })}
                    onBlur={() => handleBlur('exp')}
                    className={touched.exp && errors.exp ? 'input-error' : ''}
                  />
                  {touched.exp && errors.exp && <span className="field-error">{errors.exp}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="ccCvv">CVV</label>
                  <input
                    id="ccCvv"
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={cc.cvv}
                    onChange={(e) => setCC({ ...cc, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    onBlur={() => handleBlur('cvv')}
                    className={touched.cvv && errors.cvv ? 'input-error' : ''}
                  />
                  {touched.cvv && errors.cvv && <span className="field-error">{errors.cvv}</span>}
                </div>
              </div>

              <button type="button" className="btn-fake-cc" onClick={fillFake}>
                Generate Fake CC
              </button>

              <button type="submit" className="btn-pay" disabled={(hasErrors && Object.keys(touched).every(k => touched[k])) || loading}>
                {loading ? <span className="btn-pay-loading"><span className="spinner" /> Processing...</span> : `Pay $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
