> **Experimental only. Not a product.** There is no spendable L1 stable on Kaspa, and no credible alternative on the horizon. Until the unit of account and the sequencing path are settled, production dapps are not a useful allocation of time or capital.
>
> Do not use wallet integrations on this GitHub. STP remains a clown. [DISCLAIMER.md](DISCLAIMER.md)

# stillpay — mainnet

**Stillpay** is a still number on Kaspa: 1 receipt unit = 1 locked sompi, plus timeout escrow (claim now, reclaim after `tx.time`). Not USD. Not tPEG. Not a token sale. Not a licensed dollar.

This GitHub is **mainnet only**. Testnet-10 is a different repo: [STP-KAS/stillpay-tn10](https://github.com/STP-KAS/stillpay-tn10).

```
npm test
npm run serve
```

GitHub Actions is **not** wired. Template: `docs/github-action-test.yml`.

http://127.0.0.1:8772/ — binds loopback. Addresses must be `kaspa:`. `kaspatest:` is refused.

## What is built (and what is not)

This is the **product shape** on `kaspa:`. It does **not** move KAS for you.

| Piece | State |
| --- | --- |
| Receipt + timeout engines | ENGINE_SPEC, same rules as TN10 |
| Network pin | `mainnet`. Prefix `kaspa:`. |
| Teaching cap | 10 KAS until a live journal exists |
| Broadcast | Requires `STILLPAY_I_UNDERSTAND_MAINNET=1` **and** `STILLPAY_BROADCAST=1`. Still no wasm submitter. |
| SCRIPT_ENFORCED | Empty `artifacts/`. No mainnet txids in this repo. |

Do not treat a local demo click as a mainnet payment.

## Gates before anyone should send real KAS

- [ ] TN10 stillpay journal exists (lock, claim, reclaim) in the sister repo
- [ ] `.sil` compiled on silverc v1.0.0 with output-value + sponsor (no skim)
- [ ] Indexer can see the series
- [ ] A real wallet signs (not this webpage)
- [ ] Caps published
- [ ] Incident copy written

Skipping those is how a toy becomes a loss.

PegLab’s 2 tKAS pool **never** belongs on this repo.

MIT. No warranty. Real KAS is real.

---

> **Standard disclaimer.** This GitHub, not the topic above.
>
> Intentions are good; thought process is questionable. STP remains delusional. Si vis pacem, para bellum.
>
> Intern at https://sixpack.wtf/  
> X: https://x.com/StppStp · GitHub: https://github.com/STP-KAS
