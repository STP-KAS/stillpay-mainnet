import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {ADDRESS_PREFIX, CAIP2, FORBIDDEN_PREFIX, NETWORK, NODE_HINT, PORT, SERIES_NAME, UNIT_NAME, ReceiptError} from '../src/domain.mjs';
import {assertAddress, canBroadcast, broadcastGate} from '../src/network.mjs';
import {planBroadcast, submit} from '../src/broadcast.mjs';

describe('stillpay mainnet network pin', () => {
  it('is mainnet and refuses testnet prefixes', () => {
    assert.equal(NETWORK, 'mainnet');
    assert.equal(ADDRESS_PREFIX, 'kaspa:');
    assert.equal(FORBIDDEN_PREFIX, 'kaspatest:');
    assert.equal(PORT, 8772);
    assert.equal(UNIT_NAME, 'KAS');
    assert.equal(SERIES_NAME, 'stillpay-mainnet-receipt-v1');
    assert.equal(CAIP2, 'kaspa:mainnet');
    assert.equal(NODE_HINT, 'resolver:mainnet');
    assert.equal(assertAddress('kaspa:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'), 'kaspa:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    assert.throws(
      () => assertAddress('kaspatest:qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'),
      (err) => err instanceof ReceiptError && err.code === 'WRONG_NETWORK',
    );
    assert.equal(canBroadcast(), false);
    assert.throws(() => broadcastGate(), (err) => err instanceof ReceiptError && err.code === 'MAINNET_GATE');
    assert.equal(planBroadcast('timeout-lock', {sompi: '1'}).submitted, false);
  });

  it('one env is not enough; both still do not send', () => {
    const prevB = process.env.STILLPAY_BROADCAST;
    const prevM = process.env.STILLPAY_I_UNDERSTAND_MAINNET;
    process.env.STILLPAY_I_UNDERSTAND_MAINNET = '1';
    delete process.env.STILLPAY_BROADCAST;
    try {
      assert.throws(() => broadcastGate(), (err) => err instanceof ReceiptError && err.code === 'DRY_RUN');
      process.env.STILLPAY_BROADCAST = '1';
      const out = submit('timeout-lock', {sompi: '1'});
      assert.equal(out.submitted, false);
      assert.match(out.note, /does not sign or broadcast/i);
    } finally {
      if (prevB === undefined) delete process.env.STILLPAY_BROADCAST;
      else process.env.STILLPAY_BROADCAST = prevB;
      if (prevM === undefined) delete process.env.STILLPAY_I_UNDERSTAND_MAINNET;
      else process.env.STILLPAY_I_UNDERSTAND_MAINNET = prevM;
    }
  });
});
