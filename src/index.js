/**
 * 4-Peace LINE Bot - 主程式
 * 功能：接收 LINE 訊息、處理命令、回傳脈輪卡片
 */

// 載入環境變數
require('dotenv').config();

// 載入必要模組
const express = require('express');
const line = require('@line/bot-sdk');

// 載入服務模組
const { drawRandomCard, formatCardMessage, getAllCards } = require('./services/cardService');

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

// Webhook 路由
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

  // 根據使用者輸入處理不同功能
  if (userMessage === '抽牌' || userMessage === '「抽牌」') {
    // 隨機抽一張脈輪卡片
    const card = drawRandomCard();
    const cardText = formatCardMessage(card);
    replyMessage = {
      type: 'text',
      text: `🎴 今天的脈輪卡片：\n\n${cardText}`
    };
  } else if (userMessage === '全部卡片' || userMessage.includes('看看') || userMessage.includes('卡片')) {
    // 顯示所有卡片清單
    const allCards = getAllCards();
    const cardList = allCards.map(card => `${card.emoji} ${card.name} (${card.color})`).join('\n');
    replyMessage = {
      type: 'text',
      text: `🎴 8張脈輪卡片：\n\n${cardList}\n\n輸入「抽牌」來隨機抽一張吧！`
    };
  } else if (userMessage === '幫助' || userMessage === '功能' || userMessage === '?') {
    // 顯示幫助訊息
    replyMessage = {
      type: 'text',
      text: `👋 歡迎使用 4-Peace 脈輪抽牌機器人！\n\n🎯 可用命令：\n• 「抽牌」 - 隨機抽取今天的脈輪卡片\n• 「全部卡片」 - 查看所有8張卡片\n• 「幫助」 - 顯示此幫助訊息\n\n✨ 還有更多功能正在開發中！`
    };
  } else {
    // 預設回應
    replyMessage = {
      type: 'text',
      text: `你好！我是 4-Peace 脈輪抽牌機器人💚\n\n輸入「幫助」查看可用功能，或者直接輸入「抽牌」開始！`
    };
  }

  // 回傳訊息給使用者
  return client.replyMessage(event.replyToken, replyMessage);
}

// 健康檢查路由
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'LINE Bot is running!',
    timestamp: new Date().toISOString()
  });
});

// 根路徑
app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
      <head><title>4-Peace LINE Bot</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>🎴 4-Peace 脈輪抽牌機器人</h1>
        <p>服務正在運行中...</p>
        <p><a href="/health">Health Check</a></p>
      </body>
    </html>
  `);
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`\n🚀 ========================================`);
  console.log(`🎴 4-Peace LINE Bot 已啟動！`);
  console.log(`🚀 ========================================`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`📝 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`🚀 ========================================\n`);
});
