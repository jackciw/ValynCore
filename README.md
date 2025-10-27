**AI-Powered Development Platform on x402 Protocol**

[![Website](https://img.shields.io/badge/Website-valyncore.net-blue)](https://valyncore.net)
[![Twitter](https://img.shields.io/badge/Twitter-@valyncore-1DA1F2)](https://x.com/valyncore)
[![x402scanl](https://img.shields.io/badge/x402-Protocol-green)]((https://www.x402scan.com/composer/agent/0e97a119-c408-4b7d-a9da-3af5391df351/))

Valyn Core is an AI development agent platform built on the x402 protocol, enabling instant, frictionless payments on BNB Smart Chain. Create code, websites, smart contracts, AI agents, and more through our integrated Router powered by GPT-3.5.

## 🌟 Features

### **AI Router - 8 Powerful Commands**

Our Router provides production-ready AI capabilities with instant payment settlement:

- 💻 **`/code`** - Generate production-ready code in any programming language
- 🌐 **`/website`** - Build complete HTML/CSS/JavaScript websites
- 📜 **`/contract`** - Deploy secure Solidity smart contracts for BNB Chain
- 🤖 **`/agent`** - Create autonomous AI agents
- ⚡ **`/x402`** - Build x402 payment protocol integrations
- 🔌 **`/api`** - Generate RESTful APIs instantly
- 📊 **`/analyze`** - Analyze BNB Chain transactions via BSCScan
- 📚 **`/docs`** - Generate comprehensive technical documentation

### **x402 Protocol Integration**

Valyn Core leverages the x402 protocol to enable seamless payments:

- ✅ **Zero Platform Fees** - Direct wallet-to-wallet transfers
- ⚡ **~2 Second Settlement** - Lightning-fast transactions on BNB Chain
- 🔒 **Gasless Payments** - EIP-3009 permit signatures (no BNB required)
- 🌍 **Open Standard** - Works over HTTP, WebSocket, MCP, and Agent-to-Agent protocols
- 💰 **USDC on BNB Chain** - Stable, reliable payments using BEP-20 tokens

### **x402scan Verified Agent**

Valyn Core is officially listed on [x402scan](https://www.x402scan.com/composer/agent/0e97a119-c408-4b7d-a9da-3af5391df351/) as a verified AI development agent:

- 🎯 8 specialized AI commands
- 🔗 BNB Chain native integration
- ⚡ Instant payment verification
- 🛡️ x402 protocol certified

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### Run the Server

```bash
node server.js
```

Visit `http://localhost:3000` to access the dashboard.

## 📖 How It Works

### x402 Payment Flow

1. **Client Request** - Application requests protected resource from x402-enabled endpoint
2. **402 Payment Required** - Server returns payment requirements (amount, token, wallet)
3. **Payment Execution** - Client signs EIP-2612 permit for gasless payment on BNB Chain
4. **Content Delivery** - Payment verified in ~2 seconds, content delivered instantly

### Example Integration

```javascript
import { ValynCore } from '@valyn/sdk';

const valyn = new ValynCore({
  network: 'bnb',
  apiKey: process.env.VALYN_API_KEY
});

// Enable x402 payments on your routes
app.use('/premium', valyn.middleware({
  price: '0.01',
  token: 'USDC'
}));

app.get('/premium/data', (req, res) => {
  res.json({ data: 'Premium content' });
});
```

## 🎯 Router Commands

### Code Generation
```bash
/code python web scraper for crypto prices
```
Generates production-ready code with error handling and best practices.

### Website Building
```bash
/website portfolio with dark theme
```
Creates complete, responsive websites with modern design.

### Smart Contracts
```bash
/contract ERC-20 token with burn mechanism
```
Deploys secure, audited Solidity contracts for BNB Chain.

### AI Agents
```bash
/agent analyze BNB Chain transactions
```
Builds autonomous agents for specific tasks.

### x402 Integration
```bash
/x402 payment middleware for Express
```
Generates complete x402 protocol implementations.

### API Development
```bash
/api user authentication system
```
Creates RESTful APIs with routing and authentication.

### Blockchain Analysis
```bash
/analyze 0x123...
```
Analyzes BNB Chain transactions and wallets using BSCScan data.

### Documentation
```bash
/docs API reference for payment system
```
Generates comprehensive technical documentation.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-3.5
- **Blockchain**: BNB Smart Chain (BSC)
- **Protocol**: x402 Payment Standard
- **Tokens**: USDC (BEP-20)

### Project Structure

```
valyn-core/
├── public/
│   ├── index.html        # Dashboard
│   ├── router.html       # AI Router interface
│   ├── docs.html         # API documentation
│   ├── system.html       # System status
│   ├── styles.css        # Global styles
│   ├── script.js         # Main JavaScript
│   └── router.js         # Router logic
├── server.js             # Express server
├── package.json          # Dependencies
└── README.md            # This file
```

## 🔗 BNB Chain Integration

### Network Details

- **Chain ID**: 56 (BSC Mainnet)
- **Settlement Time**: ~2 seconds
- **Gas Fees**: Minimal (paid by relayer in gasless mode)
- **Supported Tokens**: USDC, USDT, BUSD
- **Block Explorer**: [BSCScan](https://bscscan.com)

### Smart Contract Features

- EIP-3009 permit signatures for gasless transactions
- Automatic payment verification
- On-chain settlement with cryptographic proof
- Direct wallet-to-wallet transfers

## 📊 API Endpoints

### POST /api/router
Process AI commands and generate responses.

**Request:**
```json
{
  "prompt": "Create a React component",
  "systemMessage": "You are an expert React developer"
}
```

**Response:**
```json
{
  "response": "Generated code or content"
}
```

### POST /api/payment
Process x402 payment with automatic verification.

**Request:**
```json
{
  "signature": "0xabc...",
  "amount": "0.01",
  "token": "USDC",
  "recipient": "0x123...",
  "nonce": 12345,
  "deadline": 1234567890
}
```

## 🌐 Links

- **Website**: [valyncore.net](https://valyncore.net)
- **Twitter**: [@valyncore](https://x.com/valyncore)
- **x402scan**: [Valyn Core Agent](https://www.x402scan.com/composer/agent/0e97a119-c408-4b7d-a9da-3af5391df351/)
- **x402 Protocol**: [x402.org](https://www.x402.org/)
- **BNB Chain**: [BSCScan](https://bscscan.com)

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues.

## 📄 License

Built on the open x402 protocol standard.

## 🔒 Security

- All private keys stored in environment variables
- EIP-3009 cryptographic signatures for payment verification
- Smart contract interactions audited for security
- No personal information required (no KYC)

## 💡 Use Cases

### Content Paywalls
```javascript
// Charge per article view
app.use('/articles/:id', valyn.middleware({
  price: '0.05',
  token: 'USDC'
}));
```

### API Metering
```javascript
// Different pricing per endpoint
app.use(valyn.middleware({
  '/api/translate': { price: '0.01' },
  '/api/analyze': { price: '0.10' },
  '/api/generate': { price: '0.25' }
}));
```

### Autonomous AI Agents
```javascript
// AI agent making autonomous payments
const agent = new AIAgent({
  wallet: new ValynClient({
    privateKey: process.env.AGENT_KEY,
    network: 'bnb'
  })
});
```

## 🎯 Roadmap

- [ ] Additional AI models (Claude, Gemini)
- [ ] Enhanced blockchain analysis tools
- [ ] Multi-chain support
- [ ] Advanced agent orchestration
- [ ] Enterprise API features
- [ ] Mobile app integration

## 📞 Support

For questions or support:
- Twitter: [@valyncore](https://x.com/valyncore)
- GitHub Issues: [Report a bug](../../issues)

---

**Built with ❤️ on x402 Protocol | Powered by BNB Smart Chain**
