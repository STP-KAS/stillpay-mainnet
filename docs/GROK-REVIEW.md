# Grok heavy review — stillpay-mainnet (11 Sep 2026)

Sister: [stillpay-tn10](https://github.com/STP-KAS/stillpay-tn10).

## Verdict

This is a **mainnet-shaped ENGINE_SPEC**. It must not be read as a live payment product. `kaspatest:` is refused. Broadcast needs two env vars **and still does not sign**. `artifacts/` is empty. That honesty is the product.

## Issues

### Closed here
- `timeout.mjs` no longer says SCRIPT_ENFORCED waits on a **Testnet-10** node.
- `NODE_HINT` is `resolver:mainnet`, not the invented `wss://node.kaspa.ws` (that host is not a documented public wrpc).
- Quote note states elldeeone x402 is TN10-only; this repo is not that rail.
- Demo no longer claims Parker’s TN10 pack is in `artifacts/`.
- Receipt demo uses `KAS`, not `tKAS`.
- Public-path tests use `import.meta.url`, not `C:\Users\Remco\...`.

### Open
| Severity | Issue |
| --- | --- |
| bug (on-chain) | Same `.sil` skim hole as TN10. Do not mainnet until output-value + sponsor compile. |
| bug (ops) | No wasm/wallet submitter. Env gates are not a spend. |
| suggestion | `assertAddress` unused by engines. Wire it before any submitter. |
| suggestion | Teaching cap 10 KAS is JS-only. |
| suggestion | No GitHub Action. Copy `docs/github-action-test.yml` after `gh auth refresh -s workflow`. |
