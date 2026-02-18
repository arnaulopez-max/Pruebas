
import React from 'react';
import { FTPResult, OperationState } from '../types';
import { ShieldAlert, Droplets, Clock, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ALMInsightsProps {
  results: FTPResult;
  state: OperationState;
}

const ALMInsights: React.FC<ALMInsightsProps> = ({ results, state }) => {
  const requiresEscalation = results.netMargin < 0.25;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Droplets className="w-4 h-4 text-cyan-400" />
          Treasury Insights
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-slate-500 mt-1" />
              <div>
                <p className="text-xs text-slate-400">Behavioral vs Contractual</p>
                <p className="text-lg font-bold text-white">{results.behavioralLife.toFixed(1)}Y <span className="text-xs text-slate-500 font-normal">/ {state.tenorYears}Y</span></p>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <TrendingUp className="w-5 h-5 text-slate-500 mt-1" />
              <div>
                <p className="text-xs text-slate-400">LCR (RSF Factor)</p>
                <p className="text-lg font-bold text-white">{(results.lcrImpact * 100).toFixed(0)}% <span className="text-xs text-slate-500 font-normal">HQLA Requirement</span></p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <div className={`p-4 rounded-lg flex items-start gap-3 ${requiresEscalation ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-emerald-500/10 border border-emerald-500/20'}`}>
              {requiresEscalation ? (
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              )}
              <div>
                <p className={`text-sm font-bold ${requiresEscalation ? 'text-amber-500' : 'text-emerald-500'}`}>
                  {requiresEscalation ? 'Requires ALM Escalation' : 'Standard Approval'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {requiresEscalation 
                    ? 'Margin is below hurdle rate (25bps). ALM Committee review mandatory.' 
                    : 'The operation meets all regulatory and profitability thresholds.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-400" />
          Pricing Guidance
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          The current <span className="text-white font-medium">{state.currency}</span> curve shows steepening at the 3Y-5Y tenor. Consider a shorter tenor or a floating rate structure to optimize <span className="text-white font-medium">TLP consumption</span>.
        </p>
        <button className="w-full mt-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 transition-colors">
          View Curve History
        </button>
      </div>
    </div>
  );
};

export default ALMInsights;
