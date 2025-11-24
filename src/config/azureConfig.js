/**
 * Azure Storage 設定檔
 * 管理 Azure Table Storage 的連接與設定
 */

const { TableClient } = require('@azure/data-tables');

// Azure Storage 設定
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || '4peacestore';
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

// 表格名稱定義
const TABLE_NAMES = {
  USERS: 'Users',           // 使用者資料
  CARDS: 'Cards',           // 卡片資料
  DIARY: 'Diary',           // 每日日記
  STATS: 'Statistics'       // 統計資料
};

/**
 * 建立 Table Client
 * @param {string} tableName - 表格名稱
 * @returns {TableClient} Table 客戶端
 */
function createTableClient(tableName) {
  if (!connectionString) {
    throw new Error('Azure Storage connection string is not configured');
  }
  return TableClient.fromConnectionString(connectionString, tableName);
}

// 匯出設定
module.exports = {
  accountName,
  TABLE_NAMES,
  createTableClient,
  
  // 預先建立各表格的 Client
  usersClient: () => createTableClient(TABLE_NAMES.USERS),
  cardsClient: () => createTableClient(TABLE_NAMES.CARDS),
  diaryClient: () => createTableClient(TABLE_NAMES.DIARY),
  statsClient: () => createTableClient(TABLE_NAMES.STATS)
};
