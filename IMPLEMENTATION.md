# Valyn Core - x402 Implementation Guide

## Current Status

### ✅ Completed
1. **Router Page** - Terminal-style AI command center (`/router`)
2. **OpenAI Integration** - Connected and working with provided API key
3. **Clean Navigation** - Updated all pages with "Router" link
4. **x402 Documentation** - Comprehensive docs page explaining the protocol
5. **Professional Design** - cigol.ai inspired theme throughout

### 🚧 Next Steps for Full x402 Implementation

Based on the x402-main repository examination, here's what needs to be implemented:

## Required Implementation

### 1. Install x402 Dependencies
```bash
cd valyn-core
npm install x402 viem @solana/kit
```

### 2. Create x402 Payment Middleware

The router (`/router` endpoint) should require x402 payment to access. Implementation needed:

```javascript
// In server.js
const { paymentMiddleware } = require('x402-express');

// Apply x402 payment to router endpoint
app.use('/api/router', paymentMiddleware(
  '0xYOUR_WALLET_ADDRESS', // Where to receive payments
  {
    price: '$0.01', // Price per request (in USDC)
    network: 'base-sepolia', // Test network (or 'base' for mainnet)
    config: {
      description: 'Access to AI Router commands',
      maxTimeoutSeconds: 60
    }
  },
  {
    // Facilitator config - defaults to x402.org/facilitator
    url: 'https://x402.org/facilitator'
  }
));
```

### 3. Payment Page

Create `/payment` page that shows:
- x402 payment requirements
- Wallet connection (MetaMask/WalletConnect)
- QR code for mobile wallets
- Payment status tracking
- Transaction history

Similar to x402.rocks payment flow:
1. Connect Wallet
2. Approve USDC spending (one-time)
3. Sign payment authorization (EIP-3009)
4. Access granted automatically

### 4. Client-Side x402 Integration

Add to `router.js`:
```javascript
// Check if payment is required
const response = await fetch('/api/router', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt, systemMessage })
});

if (response.status === 402) {
  // Payment required
  const paymentRequirements = await response.json();
  
  // Show payment modal
  await showPaymentModal(paymentRequirements);
  
  // After payment, retry with X-PAYMENT header
  const paymentPayload = await createPaymentPayload(paymentRequirements);
  
  const paidResponse = await fetch('/api/router', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-PAYMENT': paymentPayload
    },
    body: JSON.stringify({ prompt, systemMessage })
  });
}
```

### 5. Wallet Integration

Add wallet connection library:
```bash
npm install wagmi viem @rainbow-me/rainbowkit
```

Create wallet connector component for:
- MetaMask
- WalletConnect
- Coinbase Wallet
- Display balance
- Sign payment authorizations

### 6. Payment Information Pages

Create these pages to educate users:

#### `/how-it-works` - How x402 Payment Works
- Visual flow diagram
- Step-by-step explanation
- Benefits vs traditional payments
- Security guarantees

#### `/pricing` - Pricing Page
- Current router pricing ($0.01/request)
- Bulk purchase options
- Subscription alternatives
- Enterprise pricing

#### `/wallet-setup` - Wallet Setup Guide
- How to install MetaMask
- How to get testnet BNB/USDC
- How to approve token spending
- Troubleshooting common issues

### 7. Dashboard Enhancements

Add to homepage:
- Payment statistics (total spent, requests made)
- Transaction history
- Quick wallet connection widget
- Balance display

## Technical Requirements

### Environment Variables Needed
```env
# Server
PORT=3000
OPENAI_API_KEY=sk-proj-...
PAYMENT_WALLET_ADDRESS=0x...  # Your BNB Chain wallet
NETWORK=base-sepolia  # or 'base' for mainnet

# Client (for testing)
TEST_WALLET_PRIVATE_KEY=0x...  # For development only
```

### Smart Contract Addresses

**BNB Chain Testnet (Chain ID: 97)**
- USDC Token: Need to deploy or use existing
- x402 Facilitator: Use x402.org/facilitator

**BNB Chain Mainnet (Chain ID: 56)**
- USDC Token: 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
- x402 Facilitator: Use x402.org/facilitator or self-host

## File Structure After Implementation

```
valyn-core/
├── public/
│   ├── index.html (Dashboard)
│   ├── router.html (AI Router - requires payment)
│   ├── docs.html (Documentation)
│   ├── payment.html (Payment flow explanation)
│   ├── how-it-works.html (x402 education)
│   ├── pricing.html (Pricing tiers)
│   ├── wallet-setup.html (Wallet guide)
│   ├── styles.css
│   ├── script.js
│   ├── router.js
│   ├── payment.js (Payment handling)
│   └── wallet.js (Wallet connection)
├── server.js (x402 middleware integrated)
├── package.json (with x402 dependencies)
└── .env (wallet addresses, API keys)
```

## Testing the Implementation

### Local Testing (Testnet)

1. Get testnet tokens:
   - BNB testnet faucet: https://testnet.bnbchain.org/faucet-smart
   - USDC testnet tokens: Deploy mock or use existing

2. Configure wallet:
   ```javascript
   // In payment.js
   const config = {
     network: 'bsc-testnet',
     chainId: 97,
     rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
   };
   ```

3. Test payment flow:
   - Connect wallet
   - Request router access
   - Sign payment
   - Verify access granted

### Production Deployment

1. Switch to mainnet:
   - Update `NETWORK=base` in .env
   - Use real BNB Chain (Chain ID: 56)
   - Use production USDC contract

2. Set real pricing:
   ```javascript
   price: '$0.01', // or higher for production
   ```

3. Monitor transactions:
   - Add transaction logging
   - Set up payment webhooks
   - Track user balances

## Security Considerations

1. **Never expose private keys** - Use environment variables
2. **Validate payment signatures** - Use x402 verify endpoint
3. **Rate limiting** - Prevent abuse even with payment
4. **Session management** - Track paid sessions
5. **Error handling** - Graceful payment failures

## Benefits of This Implementation

✅ **Zero Platform Fees** - Direct wallet-to-wallet payments
✅ **Instant Settlement** - ~2 second confirmation on BNB Chain
✅ **No Registration** - Users pay with any wallet, no signup
✅ **AI Agent Ready** - Agents can autonomously pay for access
✅ **Open Standard** - Compatible with entire x402 ecosystem

## Next Immediate Actions

1. **Install Dependencies**
   ```bash
   npm install x402 x402-express viem @solana/kit wagmi @rainbow-me/rainbowkit
   ```

2. **Get Wallet Address** - Where to receive payments

3. **Choose Network** - Testnet (bsc-testnet) or Mainnet (bsc)

4. **Implement Payment Gate** - Add middleware to `/api/router`

5. **Create Payment UI** - Wallet connection + payment flow

6. **Test End-to-End** - Full payment cycle

Would you like me to implement any of these specific components?
