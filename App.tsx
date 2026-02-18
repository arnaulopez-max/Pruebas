
import React, { useState, useMemo } from 'react';
import { OperationState, Segment, Product, Currency, Amortization } from './types';
import { calculateFTP } from './utils/math';
import PricingForm from './components/PricingForm';
import WaterfallVisual from './components/WaterfallVisual';
import ALMInsights from './components/ALMInsights';
import { LayoutDashboard, FileText, Send, Save, BarChart3 } from 'lucide-react';

const App: React.FC = () => {
  const [opState, setOpState] = useState<OperationState>({
    segment: Segment.CIB,
    product: Product.TERM_LOAN,
    currency: Currency.USD,
    notional: 10000000,
    tenorYears: 5,
    customerRate: 5.50,
    amortization: Amortization.BULLET,
    optionality: false
  });

  const ftpResults = useMemo(() => calculateFTP(opState), [opState]);

  const handleUpdate = (updates: Partial<OperationState>) => {
    setOpState(prev => ({ ...prev, ...updates }));
  };

  const canSubmit = ftpResults.netMargin > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Vantage Pricing</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-Time FTP Engine v3.1</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-semibold text-emerald-400 border-b-2 border-emerald-400 pb-1">Simulation</a>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-slate-300 transition-colors">Curve Manager</a>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-slate-300 transition-colors">ALM Dashboard</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Save className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-600">
                JD
              </div>
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">J. Doe (CIB RM)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Section A: Configuration */}
          <div className="lg:col-span-4">
            <PricingForm state={opState} onChange={handleUpdate} />
          </div>

          {/* Section B: Profitability Waterfall */}
          <div className="lg:col-span-5">
            <WaterfallVisual results={ftpResults} />
          </div>

          {/* Section C: ALM Vision */}
          <div className="lg:col-span-3">
            <ALMInsights results={ftpResults} state={opState} />
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
              <span className="text-slate-400">Curve Data: <span className="text-slate-200 font-mono">Real-time Feed</span></span>
            </div>
            <div className="w-px h-4 bg-slate-800"></div>
            <div className="text-slate-400 font-medium">
              Simulation ID: <span className="text-slate-200 font-mono">SIM-88219-X</span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-sm font-bold text-slate-200 rounded-xl border border-slate-700 transition-all">
              <FileText className="w-4 h-4" />
              Download Report
            </button>
            <button 
              disabled={!canSubmit}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg ${
                canSubmit 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 active:scale-95' 
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <Send className="w-4 h-4" />
              {canSubmit ? 'Submit to Client' : 'Escalation Required'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-12 py-8 border-t border-slate-900 text-center">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
          Confidential Proprietary System &copy; 2024 Global Banking Treasury Services
        </p>
      </footer>
    </div>
  );
};

export default App;
