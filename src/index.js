// 載入環境變數
require('dotenv').config();

// 載入必要模組
const express = require('express');
const line = require('@line/bot-sdk');

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

  // 簡單的回聲功能 (Echo Bot)
  const echo = {
    type: 'text',
    text: `你說：${event.message.text}`
  };

  // 回傳訊息給使用者
  return client.replyMessage(event.replyToken, echo);
}

// 健康檢查路由
app.get('/health', (req, res) => {
  res.status(200).send('LINE Bot is running!');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`🚀 LINE Bot server is running on port ${PORT}`);
  console.log(`📝 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
