/**
 * 4-Peace LINE Bot - 主程式
 * 功能：接收 LINE 訊息、處理命令、回傳脈輪卡片
 */

// 載入環境變數
require('dotenv').config();

// 載入必要套件
const express = require('express');
const line = require('@line/bot-sdk');

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

// Webhook 路徑
app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    // 處理所有接收到的事件
    const events = req.body.events;
    await Promise.all(events.map(handleEvent));
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 處理訊息事件
async function handleEvent(event) {
  // 只處理訊息類型的事件
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  const userMessage = event.message.text.trim();
  let replyMessage;

  // 根據使用者輸入來處理不同功能
  if (userMessage === '抽牌' || userMessage === '「抽牌。') {
    // 隨機抽一張禪卡卡片
    const card = drawRandomCard();
    const flexMessage = createCardFlexMessage(card);
    replyMessage = {
      type: 'flex',
      altText: `今天抽到的卡片：${card.name} ${card.emoji}`,
      contents: flexMessage
    };
  } else if (userMessage === '全部卡片' || userMessage.includes('看卡') || userMessage.includes('卡片')) {
    // 顯示所有卡片成盤
    const allCards = getAllCards();
    const carouselMessage = createCarouselFlexMessage(allCards);
    replyMessage = {
      type: 'flex',
      altText: '8張脈輪卡片：' + allCards.map(card => `${card.emoji} ${card.name}`).join(' '),
      contents: carouselMessage
    };
  } else if (userMessage === '幫助' || userMessage === '功能' || userMessage === '?') {
    // 顯示幫助訊息
    replyMessage = {
      type: 'text',
      text: '💜 歡迎使用 4-Peace 禪卡抽牌機器人！\n\n可以命令：\n✨ 「抽牌」- 隨機抽一張禪卡\n🎴 「全部卡片」- 查看所有 8 張禪卡\n❓ 「幫助」- 顯示這個訊息'
    };
  } else {
    // 預設回應
    replyMessage = {
      type: 'text',
      text: `你好！歡迎使用 4-Peace 禪卡抽牌機器人💚\n\n輸入「抽牌」查看今天的禪卡，或輸入「幫助」查看更多功能！`
    };
  }

  // 回傳訊息給使用者
  return client.replyMessage(event.replyToken, replyMessage);
}

// 健康檢查路徑
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: '4-Peace LINE Bot is running!'
  });
});

// 首頁路徑
app.get('/', (req, res) => {
  res.send('💜 4-Peace LINE Bot 禪卡抽牌機器人正在運行中...');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 4-Peace LINE Bot started on port ${PORT}`);
  console.log(`🎯 Webhook URL: https://your-domain.com/webhook`);
  console.log(`✅ Ready to receive messages!`);
});
