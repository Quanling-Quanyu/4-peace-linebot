/**
 * 4-Peace LINE Bot - 主程式
 * 功能：接收 LINE 訊息、處理命令、回傳脈輪卡片、LIFF 網頁服務
 */

// 載入環境變數
require('dotenv').config();

// 載入必要套件
const express = require('express');
const line = require('@line/bot-sdk');
const path = require('path');

// 載入服務模組
const { drawRandomCard, getAllCards } = require('./services/cardService');
const { createCardFlexMessage, createCarouselFlexMessage } = require('./services/flexMessageService');

// LINE Bot 設定
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

// 建立 LINE Bot Client
const client = new line.Client(config);

// 建立 Express 應用程式
const app = express();

// 設定 PORT
const PORT = process.env.PORT || 3000;

// 提供靜態檔案服務 (支援 LIFF 網頁)
app.use('/public', express.static(path.join(__dirname, '../public')));

// Webhook 路徑
app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    // 處理所有接收到的事件
    const events = req.body.events;
    const results = await Promise.all(
      events.map(event => handleEvent(event))
    );

    res.json({ success: true, results });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 處理事件
async function handleEvent(event) {
  // 只處理訊息事件
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const userMessage = event.message.text.trim();
  let replyMessage;

  // 根據使用者輸入處理不同命令
  if (userMessage === '抽牌' || userMessage.toLowerCase() === 'draw') {
    // 抽一張隨機卡片
    const card = drawRandomCard();
    replyMessage = createCardFlexMessage(card);

  } else if (userMessage === '全部卡片' || userMessage.toLowerCase() === 'all cards') {
    // 顯示所有卡片的輪播
    const cards = getAllCards();
    replyMessage = createCarouselFlexMessage(cards);

  } else if (userMessage === '幫助' || userMessage.toLowerCase() === 'help') {
    // 幫助訊息
    replyMessage = {
      type: 'text',
      text: '🔮 4-Peace 禪卡機器人使用說明：\n\n🎴 輸入「抽牌」- 隨機抽取一張禪卡\n🎨 輸入「全部卡片」- 查看所有 8 張卡片\n❓ 輸入「幫助」- 顯示此訊息'
    };

  } else {
    // 預設回應
    replyMessage = {
      type: 'text',
      text: '你好！歡迎使用 4-Peace 禪卡機器人💜\n\n輸入「抽牌」開始你的禪卡之旅，或者輸入「幫助」查看更多功能！'
    };
  }

  // 回傳訊息給使用者
  return client.replyMessage(event.replyToken, replyMessage);
}

// 健康檢查端點
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: '4-Peace LINE Bot is running!'
  });
});

// 首頁路徑
app.get('/', (req, res) => {
  res.send('💜 4-Peace LINE Bot 禪卡機器人已啟動！歡迎在LINE中使用～');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 4-Peace LINE Bot started on port ${PORT}`);
  console.log(`🛑 Webhook URL: https://your-domain.com/webhook`);
  console.log(`✅ Ready to receive messages!`);
});
