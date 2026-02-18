
import { Currency } from './types';

export const MOCK_FTP_DATA = {
  currencies: [Currency.USD, Currency.SAR],
  curves: {
    [Currency.USD]: { base: 4.20, tlp1Y: 0.15, tlp3Y: 0.32, tlp5Y: 0.48 },
    [Currency.SAR]: { base: 5.10, tlp1Y: 0.25, tlp3Y: 0.45, tlp5Y: 0.65 }
  },
  regulatory: {
    lcrCharge: 0.10,
    nsfrCharge: 0.05,
    rwaCapitalCost: 0.25
  }
};

export const COLORS = {
  profit: 'text-emerald-400',
  cost: 'text-rose-400',
  neutral: 'text-slate-400',
  accent: 'text-blue-400',
  bgCard: 'bg-slate-800/50',
  border: 'border-slate-700'
};
