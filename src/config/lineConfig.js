/**
 * LINE Bot 設定檔
 * 管理 LINE Messaging API 的設定與客戶端
 */

const line = require('@line/bot-sdk');

// LINE Bot 設定
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

// 建立 LINE Bot Client
const client = new line.Client(config);

// 匯出設定與客戶端
module.exports = {
  config,
  client,
  middleware: line.middleware(config)
};
