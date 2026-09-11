import {ADDRESS_PREFIX, FORBIDDEN_PREFIX, NETWORK, ReceiptError} from './domain.mjs';

export function assertAddress(address, label = 'address') {
  if (typeof address !== 'string' || address.length < 12) {
    throw new ReceiptError('BAD_ADDRESS', `Expected a ${NETWORK} address for ${label}.`);
  }
  if (address.startsWith(FORBIDDEN_PREFIX)) {
    throw new ReceiptError('WRONG_NETWORK', `${label} is testnet — this repo is mainnet only.`);
  }
  if (!address.startsWith(ADDRESS_PREFIX)) {
    throw new ReceiptError('WRONG_NETWORK', `${label} must start with ${ADDRESS_PREFIX}`);
  }
  return address;
}

export function canBroadcast() {
  return process.env.STILLPAY_BROADCAST === '1' && process.env.STILLPAY_I_UNDERSTAND_MAINNET === '1';
}

export function broadcastGate() {
  if (process.env.STILLPAY_I_UNDERSTAND_MAINNET !== '1') {
    throw new ReceiptError(
      'MAINNET_GATE',
      'Mainnet broadcast needs STILLPAY_I_UNDERSTAND_MAINNET=1 and STILLPAY_BROADCAST=1. This is real KAS. There is no wasm submitter in this repo yet.',
    );
  }
  if (process.env.STILLPAY_BROADCAST !== '1') {
    throw new ReceiptError('DRY_RUN', 'Set STILLPAY_BROADCAST=1 only after a signed mainnet tx exists. Default is dry-run.');
  }
}
