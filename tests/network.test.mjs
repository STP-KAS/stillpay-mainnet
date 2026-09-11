import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {ADDRESS_PREFIX, FORBIDDEN_PREFIX, NETWORK, NODE_HINT, ReceiptError} from '../src/domain.mjs';
import {assertAddress, canBroadcast, broadcastGate} from '../src/network.mjs';
import {planBroadcast} from '../src/broadcast.mjs';

describe('stillpay mainnet network pin', () => {
  it('is mainnet and refuses testnet prefixes', () => {
    assert.equal(NETWORK, 'mainnet');
    assert.equal(ADDRESS_PREFIX, 'kaspa:');
    assert.equal(FORBIDDEN_PREFIX, 'kaspatest:');
    assert.equal(assertAddress('kaspa:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'), 'kaspa:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    assert.throws(
      () => assertAddress('kaspatest:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'),
      (err) => err instanceof ReceiptError && err.code === 'WRONG_NETWORK',
    );
    assert.equal(canBroadcast(), false);
    assert.throws(() => broadcastGate(), (err) => err instanceof ReceiptError && err.code === 'MAINNET_GATE');
    assert.equal(planBroadcast('timeout-lock', {sompi: '1'}).network, 'mainnet');
    assert.equal(planBroadcast('timeout-lock', {sompi: '1'}).submitted, false);
    assert.equal(NODE_HINT.startsWith('wss://'), false);
  });
});
