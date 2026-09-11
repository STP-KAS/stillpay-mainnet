import {NETWORK, NODE_HINT, PROJECT} from './domain.mjs';
import {broadcastGate} from './network.mjs';

export function planBroadcast(kind, payload) {
  return {
    project: PROJECT,
    network: NETWORK,
    node: NODE_HINT,
    kind,
    payload,
    submitted: false,
    note: 'MAINNET dry-run. No wasm submitter. Real KAS is not moved by this function.',
  };
}

export function submit(kind, payload) {
  broadcastGate();
  const plan = planBroadcast(kind, payload);
  plan.submitted = false;
  plan.note =
    'Both mainnet env gates are on, and this process still does not sign or broadcast. Use a real wallet. Journal txids in artifacts/.';
  return plan;
}
