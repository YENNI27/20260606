# 🚇 台灣旅行規劃小幫手 - Travel Buddy

## 專案概述

Travel Buddy 是一個互動式的台灣旅行規劃網站，幫助用戶一步步規劃完美的台灣旅行。網站提供多個實用功能，包括旅行教學、偏好測驗、行程生成、預算規劃等。

## 特色功能

### 🎨 主題切換系統
- 🌿 森林綠
- 🌸 櫻花粉
- 🌊 海洋藍
- 🌙 夜空紫

主題偏好會自動保存到本地存儲。

### 📚 功能模塊

1. **首頁 (Home)** - 歡迎頁面和功能導航
2. **旅行規劃教學 (Planning Guide)** - 4步教學模塊
3. **旅行偏好測驗 (Quiz)** - 4題測驗，自動推薦旅行風格
4. **智慧行程產生器 (Itinerary Generator)** - 自動生成每日行程
5. **預算規劃器 (Budget Planner)** - 精確的預算分配計算
6. **選擇障礙救星 (Random Recommendation)** - 隨機景點推薦
7. **台灣景點地圖 (Map)** - 完整的台灣景點資訊
8. **旅遊小知識 (Trivia)** - 翻牌式的旅遊知識卡片
9. **成就系統 (Achievement System)** - 解鎖旅行徽章

## 技術棧

- **前端框架**: React 18
- **構建工具**: Vite
- **樣式系統**: Tailwind CSS
- **路由**: React Router v6
- **圖標庫**: Lucide React
- **狀態管理**: React Context API

## 安裝和運行

### 安裝依賴
```bash
npm install
```

### 啟動開發服務器
```bash
npm run dev
```

### 構建生產版本
```bash
npm run build
```

## 項目結構

```
src/
├── components/          # 共用組件
├── pages/              # 各個功能頁面
├── context/            # 狀態管理上下文
├── data/               # 數據文件
├── App.jsx             # 主應用
├── index.css           # 全局樣式
└── main.jsx            # 入口文件
```

## 景點數據

應用包含 10 個台灣主要景點：
- **北部**: 淡水、平溪、九份
- **中部**: 阿里山、日月潭、台中宮原眼科
- **南部**: 墾丁、高雄 85 大樓
- **東部**: 綠島、花蓮太魯閣

## 成就系統

用戶可以通過完成任務解鎖徽章：
- ✔ 偏好測驗 → 🏅 旅行新手
- ✔ 預算規劃 → 💰 預算達人
- ✔ 行程生成 → 📍 行程規劃師
- ✔ 教學完成 → 🗺️ 台灣探索家

## 浏覽器兼容性

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## 本地存儲

應用使用瀏覽器本地存儲保存：
- 用戶選擇的主題
- 已解鎖的成就

---

**祝你旅行愉快！🇹🇼**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
