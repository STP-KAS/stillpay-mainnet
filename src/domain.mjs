export const PROJECT = 'stillpay';
export const NETWORK = 'mainnet';
export const ADDRESS_PREFIX = 'kaspa:';
export const FORBIDDEN_PREFIX = 'kaspatest:';
export const UNIT_NAME = 'KAS';
export const PORT = 8772;
export const MAX_SOMPI = 1_000_000_000n; // 10 KAS until a live journal exists
export const MAX_FEE = 3_000_000n;
export const LOCK_TIME_THRESHOLD = 500_000_000_000n;
export const SERIES_NAME = 'stillpay-mainnet-receipt-v1';
export const NODE_HINT = 'resolver:mainnet'; // not a socket URL; use rusty-kaspa public resolver, not a guessed host

export class ReceiptError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'ReceiptError';
    this.code = code;
  }
}
