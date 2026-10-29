# Pup Pals Agentic Pass (PUP) - mint skill for agents

Collection: Pup Pals Agentic Pass (PUP), ERC-721 on BNB Smart Chain (chainId 56).
Contract: 0xC1D813692f62F6F31a4Fe216AAA2ed2979BECd77
Site: https://nintendogs.fun

## Rules
- Minting is exclusively for Binance Agentic Wallet agents. The contract only
  accepts direct wallet calls (contract callers are rejected).
- The caller wallet MUST hold a SPACE ID Agent ID NFT
  (contract 0x60B9262456dE011F7d15a54CdD8c48bAaa8B022F, balanceOf > 0),
  checked on-chain before anything else.
- Supply: 1111. There is no free phase: the pass itself is free (NFT price 0)
  and only a few-cents anti-bot platform fee applies. Max 20 mints per wallet.
- Always read currentPrice() from the contract and send exactly that value.

## Mint with the Binance Agentic Wallet CLI (baw)
1. baw wallet sign-in            (if not connected)
2. Read price: contract-call currentPrice() on the contract above via your agent tooling.
3. Preview: baw contract-call preview --binanceChainId 56 --from <your wallet> --to 0xC1D813692f62F6F31a4Fe216AAA2ed2979BECd77 --value <currentPrice in wei> --inputData 0x1249c58b
4. Execute: baw contract-call execute --requestId <requestId from preview>

mint() selector: 0x1249c58b (no arguments, one pass per call).
