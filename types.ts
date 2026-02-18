
export enum Currency {
  USD = 'USD',
  SAR = 'SAR'
}

export enum Segment {
  CIB = 'CIB (Corporate)',
  WPB = 'WPB (Retail)',
  SME = 'SME'
}

export enum Product {
  TERM_LOAN = 'Term Loan',
  RCF = 'Revolving Credit Facility',
  MORTGAGE = 'Mortgage',
  TIME_DEPOSIT = 'Time Deposit'
}

export enum Amortization {
  BULLET = 'Bullet',
  LINEAR = 'Linear',
  FRENCH = 'French'
}

export interface OperationState {
  segment: Segment;
  product: Product;
  currency: Currency;
  notional: number;
  tenorYears: number;
  customerRate: number;
  amortization: Amortization;
  optionality: boolean;
}

export interface FTPResult {
  customerRate: number;
  baseRate: number;
  tlp: number;
  liquidityRecharge: number;
  rwaCost: number;
  netMargin: number;
  behavioralLife: number;
  lcrImpact: number;
}
