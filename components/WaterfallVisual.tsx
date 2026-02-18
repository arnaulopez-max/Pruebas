
import React from 'react';
import { FTPResult } from '../types';
import { ArrowDownRight, ArrowUpRight, ChevronRight, Activity } from 'lucide-react';

interface WaterfallVisualProps {
  results: FTPResult;
}

const WaterfallVisual: React.FC<WaterfallVisualProps> = ({ results }) => {
  const steps = [
    { label: 'Customer Rate', value: results.customerRate, type: 'positive', sub: 'Gross revenue from client' },
    { label: 'Base Rate (Swap)', value: results.baseRate, type: 'negative', sub: 'Funding cost (Repricing curve)' },
    { label: 'TLP', value: results.tlp, type: 'negative', sub: 'Term Liquidity Premium (Behavioral)' },
    { label: 'Liq. Recharge', value: results.liquidityRecharge, type: 'negative', sub: 'LCR & NSFR regulatory costs' },
    { label: 'RWA Cost', value: results.rwaCost, type: 'negative', sub: 'Capital consumption cost' },
  ];

  const isProfitable = results.netMargin > 0;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          Profitability Waterfall
        </h2>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${isProfitable ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {isProfitable ? 'Value Creator' : 'Value Destroyer'}
        </div>
      </div>

      <div className="space-y-6 flex-grow">
        {steps.map((step, idx) => (
          <div key={idx} className="relative">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${step.type === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {step.type === 'positive' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{step.label}</p>
                  <p className="text-[10px] text-slate-500">{step.sub}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-mono font-bold ${step.type === 'positive' ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {step.type === 'positive' ? '+' : '-'}{step.value.toFixed(2)}%
                </span>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="ml-[18px] mt-1 h-4 border-l-2 border-slate-700/50"></div>
            )}
          </div>
        ))}

        <div className="mt-8 pt-6 border-t border-slate-700">
          <div className={`flex items-center justify-between p-4 rounded-xl ${isProfitable ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isProfitable ? 'bg-emerald-500 text-slate-900' : 'bg-rose-500 text-slate-900'}`}>
                <ChevronRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-400">Net Commercial Margin (NIM)</p>
                <p className={`text-2xl font-mono font-black ${isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {results.netMargin.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="h-2 w-24 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${isProfitable ? 'bg-emerald-400' : 'bg-rose-400'}`}
                  style={{ width: `${Math.min(Math.max(results.netMargin * 20, 0), 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterfallVisual;
