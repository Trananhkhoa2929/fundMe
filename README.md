# 🚀 CryptoGive - Blockchain Charity Platform

Một ứng dụng Web3 GoFundMe phi tập trung cho phép bạn quyên góp Ethereum cho các tổ chức từ thiện và hoạt động nhân đạo.

![Home Page](gofundme/src/assets/images/sitePreview.png)

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Thiết lập ví MetaMask](#thiết-lập-ví-metamask)
- [Chạy ứng dụng](#chạy-ứng-dụng)
- [Deploy Smart Contract](#deploy-smart-contract)
- [Tính năng chính](#tính-năng-chính)
- [Cấu trúc dự án](#cấu-trúc-dự-án)

---

## 🎯 Giới thiệu

**CryptoGive** là một nền tảng quyên góp từ thiện sử dụng blockchain Ethereum, cho phép:
- ✅ Quyên góp ETH một cách minh bạch và an toàn
- ✅ Theo dõi tất cả các khoản đóng góp trên blockchain
- ✅ Kết nối trực tiếp với ví MetaMask
- ✅ Xem tỷ giá ETH/USD realtime
- ✅ Hỗ trợ nhiều hoạt động từ thiện khác nhau

Smart contract được viết bằng Solidity và có thể deploy trên Sepolia testnet hoặc chạy local với Hardhat.

---

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18** - UI Framework
- **SCSS** - Styling
- **Ethers.js v5** - Web3 Library
- **Formik + Yup** - Form validation
- **React Icons** - Icons
- **Axios** - HTTP requests

### Blockchain
- **Solidity 0.8.9** - Smart Contract language
- **Hardhat** - Development environment
- **Ethers.js** - Contract interaction
- **Waffle** - Testing framework

---

## 💻 Yêu cầu hệ thống

Trước khi bắt đầu, đảm bảo bạn đã cài đặt:

- **Node.js** >= 14.x ([Download tại đây](https://nodejs.org/))
- **npm** hoặc **yarn**
- **Git**
- **MetaMask Extension** ([Chrome](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/))

---

## 📦 Hướng dẫn cài đặt

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/GoFundMeBlockchain.git
cd GoFundMeBlockchain
```

### 2️⃣ Cài đặt Dependencies

#### Cài đặt cho Smart Contract (Hardhat)
```bash
cd contracts
npm install
```

#### Cài đặt cho Frontend (React)
```bash
cd ../gofundme
npm install
```

### 3️⃣ Thiết lập Environment Variables

Tạo file `.env` trong thư mục `contracts/`:

```bash
cd contracts
# Windows
echo. > .env

# Linux/Mac
touch .env
```

Thêm nội dung sau vào file `.env`:

```env
# Sepolia RPC URL (lấy từ Alchemy hoặc Infura)
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# Private key của ví deploy (CHỈ DÙNG VÍ TEST, KHÔNG DÙNG VÍ THẬT!)
PRIVATE_KEY=your_private_key_here
```

> ⚠️ **LƯU Ý:** Không bao giờ commit file `.env` lên Git! File này đã được thêm vào `.gitignore`.

---

## 🦊 Thiết lập ví MetaMask

### Bước 1: Cài đặt MetaMask
1. Truy cập [metamask.io](https://metamask.io/)
2. Tải và cài đặt extension cho trình duyệt của bạn
3. Tạo ví mới hoặc import ví có sẵn

### Bước 2: Thêm Sepolia Testnet (nếu deploy lên testnet)

1. Mở MetaMask
2. Click vào dropdown network ở trên cùng
3. Click "Add Network" → "Add Network Manually"
4. Điền thông tin:
   - **Network Name:** Sepolia
   - **RPC URL:** `https://rpc.sepolia.org`
   - **Chain ID:** `11155111`
   - **Currency Symbol:** `ETH`
   - **Block Explorer:** `https://sepolia.etherscan.io`
5. Click "Save"

### Bước 3: Lấy Test ETH (Sepolia Faucet)

Để test ứng dụng, bạn cần có ETH test:

1. Copy địa chỉ ví MetaMask của bạn
2. Truy cập các faucet sau:
   - [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
   - [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
   - [Chainlink Faucet](https://faucets.chain.link/sepolia)
3. Paste địa chỉ ví và request ETH
4. Đợi vài phút để nhận 0.5-1 ETH test

### Bước 4: Thiết lập Local Hardhat Network (tuỳ chọn)

Nếu muốn test local:

1. Mở MetaMask → Networks → "Add Network Manually"
2. Điền:
   - **Network Name:** Hardhat Local
   - **RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `1337`
   - **Currency Symbol:** `ETH`
3. Import private key từ Hardhat (xem console khi chạy `npx hardhat node`)

---

## 🚀 Chạy ứng dụng

### Option 1: Chạy với Local Hardhat Network

#### Bước 1: Khởi động Hardhat Node

Mở terminal thứ nhất:

```bash
cd contracts
npx hardhat node
```

Console sẽ hiển thị danh sách accounts với private keys. Giữ terminal này chạy!

#### Bước 2: Deploy Contract lên Local Network

Mở terminal thứ hai:

```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

Bạn sẽ thấy:
```
🚀 Deploying DonateToACharity contract...
✅ Contract deployed successfully!
📝 Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**QUAN TRỌNG:** Copy địa chỉ contract này!

#### Bước 3: Cập nhật Contract Address trong Frontend

Mở file `gofundme/src/utils/utilFunctions.js` và thay thế contract address:

```javascript
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ← Paste địa chỉ vừa copy
```

#### Bước 4: Khởi động React App

Mở terminal thứ ba:

```bash
cd gofundme
npm start
```

App sẽ tự động mở tại `http://localhost:3000`

#### Bước 5: Kết nối MetaMask

1. Đảm bảo MetaMask đang ở network "Hardhat Local" (Chain ID 1337)
2. Import một account từ Hardhat node (copy private key từ terminal 1)
3. Click nút "Connect Wallet" trên web
4. Approve kết nối trong MetaMask
5. Bắt đầu donate! 🎉

---

### Option 2: Chạy với Sepolia Testnet

#### Bước 1: Deploy Contract lên Sepolia

```bash
cd contracts
npx hardhat run scripts/deploy.js --network sepolia
```

#### Bước 2: Cập nhật Contract Address

Tương tự như Option 1, bước 3.

#### Bước 3: Chạy Frontend

```bash
cd gofundme
npm start
```

#### Bước 4: Kết nối MetaMask

1. Chuyển MetaMask sang Sepolia network
2. Đảm bảo có test ETH trong ví
3. Connect wallet và test!

---

## 📝 Deploy Smart Contract

### Compile Contract

```bash
cd contracts
npx hardhat compile
```

### Run Tests

```bash
cd contracts
npx hardhat test
```

### Deploy Commands

```bash
# Deploy lên local
npx hardhat run scripts/deploy.js --network localhost

# Deploy lên Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Verify contract trên Etherscan (sau khi deploy)
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

---

## ✨ Tính năng chính

### 🔗 Connect to MetaMask
- Tự động phát hiện MetaMask
- Hiển thị số dư ví realtime
- Theo dõi thay đổi account/network

![Connect Wallet](gofundme/src/assets/images/sitePreview2.png)

### 💰 Donate ETH
- Chọn charity/cause để donate
- Nhập số lượng ETH muốn donate
- Validation form (không donate quá số dư)
- Xem tỷ giá ETH → USD realtime

### 📊 Track Donations
- Xem tổng số ETH đã donate cho mỗi cause
- Lịch sử transactions trên blockchain
- Transparent và immutable

### 🎨 Modern UI/UX
- Responsive design
- Dark theme với gradient effects
- Smooth animations
- Mobile-friendly

---

## 📁 Cấu trúc dự án

```
GoFundMeBlockchain/
├── contracts/                    # Smart contracts
│   ├── contracts/
│   │   └── DonateToACharity.sol # Main contract
│   ├── scripts/
│   │   └── deploy.js            # Deploy script
│   ├── test/
│   │   └── DonateFunds.test.js  # Contract tests
│   ├── hardhat.config.js        # Hardhat config
│   └── package.json
│
├── gofundme/                    # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── NavBar.js
│   │   │   ├── Featured.js      # Causes list
│   │   │   ├── Modal.js         # Donation modal
│   │   │   └── ...
│   │   ├── styles/              # SCSS files
│   │   ├── utils/
│   │   │   ├── utilFunctions.js # Contract interactions
│   │   │   └── DonateEth.json   # Contract ABI
│   │   ├── assets/              # Images & SVGs
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md                    # Documentation
```

---

## 🐛 Troubleshooting

### MetaMask không kết nối?
- Kiểm tra network (phải match với contract network)
- Refresh page và thử lại
- Xoá cache MetaMask

### Transaction thất bại?
- Kiểm tra số dư ETH (cần có gas fee)
- Đảm bảo contract address đúng
- Xem console log để debug

### Images không hiển thị?
- Kiểm tra đường dẫn import
- Xem browser console
- Clear cache và restart dev server

### Contract không tìm thấy?
- Đảm bảo đã deploy contract
- Kiểm tra contract address trong `utilFunctions.js`
- Kiểm tra network đang connect

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Contact

Nếu có vấn đề, hãy tạo issue trên GitHub hoặc liên hệ qua email.

---

**Happy Coding! 🚀💚**

