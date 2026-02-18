
import React from 'react';
import { OperationState, Segment, Product, Currency, Amortization } from '../types';
import { Wallet, Landmark, Globe, Calendar, Percent, Settings2 } from 'lucide-react';

interface PricingFormProps {
  state: OperationState;
  onChange: (updates: Partial<OperationState>) => void;
}

const PricingForm: React.FC<PricingFormProps> = ({ state, onChange }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-8">
        <Settings2 className="w-5 h-5 text-emerald-400" />
        Operation Parameters
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
        {/* Segment */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
            <Landmark className="w-3 h-3" /> Segment
          </label>
          <select 
            value={state.segment}
            onChange={(e) => onChange({ segment: e.target.value as Segment })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
          >
            {Object.values(Segment).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Product */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
            <Wallet className="w-3 h-3" /> Product
          </label>
          <select 
            value={state.product}
            onChange={(e) => onChange({ product: e.target.value as Product })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          >
            {Object.values(Product).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Currency & Notional */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
            <Globe className="w-3 h-3" /> Currency
          </label>
          <div className="flex gap-2">
            <select 
              value={state.currency}
              onChange={(e) => onChange({ currency: e.target.value as Currency })}
              className="w-24 bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none"
            >
              {Object.values(Currency).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input 
              type="number"
              value={state.notional}
              onChange={(e) => onChange({ notional: Number(e.target.value) })}
              className="flex-grow bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none"
              placeholder="Amount"
            />
          </div>
        </div>

        {/* Tenor */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Tenor (Years)
          </label>
          <input 
            type="range"
            min="1"
            max="10"
            step="1"
            value={state.tenorYears}
            onChange={(e) => onChange({ tenorYears: Number(e.target.value) })}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-bold">
            <span>1Y</span>
            <span className="text-white bg-slate-700 px-2 py-0.5 rounded-full">{state.tenorYears}Y</span>
            <span>10Y</span>
          </div>
        </div>

        {/* Customer Rate */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
            <Percent className="w-3 h-3" /> Customer Rate (%)
          </label>
          <div className="relative">
            <input 
              type="number"
              step="0.01"
              value={state.customerRate}
              onChange={(e) => onChange({ customerRate: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">%</span>
          </div>
        </div>

        {/* Amortization */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
             Amortization
          </label>
          <select 
            value={state.amortization}
            onChange={(e) => onChange({ amortization: e.target.value as Amortization })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-3 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500/50 outline-none"
          >
            {Object.values(Amortization).map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-700">
        <label className="flex items-center justify-between cursor-pointer group">
          <div>
            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Behavioral Opcionality</span>
            <p className="text-[10px] text-slate-500">Include prepayment & early withdrawal adjustments</p>
          </div>
          <div className="relative inline-flex items-center">
            <input 
              type="checkbox" 
              checked={state.optionality}
              onChange={(e) => onChange({ optionality: e.target.checked })}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PricingForm;
