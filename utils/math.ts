
import { OperationState, FTPResult, Currency } from '../types';
import { MOCK_FTP_DATA } from '../constants';

export const calculateFTP = (state: OperationState): FTPResult => {
  const { currency, tenorYears, customerRate, optionality } = state;
  const curve = MOCK_FTP_DATA.curves[currency];
  
  // Base Rate (Repricing Maturity)
  const baseRate = curve.base;
  
  // TLP based on Tenor
  let tlp = curve.tlp1Y;
  if (tenorYears > 1 && tenorYears <= 3) tlp = curve.tlp3Y;
  if (tenorYears > 3) tlp = curve.tlp5Y;
  
  // Optionality penalty (Behavioral Effect)
  if (optionality) {
    tlp += 0.12; 
  }

  // Regulatory costs
  const liquidityRecharge = MOCK_FTP_DATA.regulatory.lcrCharge + MOCK_FTP_DATA.regulatory.nsfrCharge;
  const rwaCost = MOCK_FTP_DATA.regulatory.rwaCapitalCost;
  
  // Net Margin = Customer Rate - (Base Rate + TLP + Liq + RWA)
  const totalCost = baseRate + tlp + liquidityRecharge + rwaCost;
  const netMargin = customerRate - totalCost;

  // Behavioral Life calculation (Mock: usually shorter than contractual)
  const behavioralLife = tenorYears * 0.75;
  
  // LCR Impact (Mock percentage)
  const lcrImpact = (state.notional / 1000000) * 0.15; 

  return {
    customerRate,
    baseRate,
    tlp,
    liquidityRecharge,
    rwaCost,
    netMargin,
    behavioralLife,
    lcrImpact
  };
};
