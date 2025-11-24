/**
 * 卡片服務 - 管理8張脈輪卡片
 * 每張卡片代表一個脈輪，有專屬的顏色和意義
 */

// 8張脈輪卡片資料
const CHAKRA_CARDS = [
  {
    id: 1,
    name: '海底輪',
    english: 'Root Chakra',
    color: '紅色－蘋果花',
    colorCode: '#E8382F',
    emoji: '❤️',
    quotes: '做就對了',
    meaning: '生存、安全感、物質基礎',
    keywords: ['穩定', '根基', '生命力', '地球連結'],
    message: '需要建立穩固的基礎，讓自己感到安全和穩定。'
  },
  {
    id: 2,
    name: '臍輪',
    english: 'Sacral Chakra',
    color: '橙色－苦橙花',
    colorCode: '#F3981C',
    emoji: '🧡',
    quotes: '耐性等待',
    meaning: '情緒、創造力、感官享受',
    keywords: ['創造', '感情', '愛欲', '喜悅'],
    message: '讓自己自由地表達情感，享受生命的樂趣。'
  },
  {
    id: 3,
    name: '太陽神經輮',
    english: 'Solar Plexus Chakra',
    color: '黃色－黃金桂花',
    colorCode: '#FFB71B',
    emoji: '💛',
    quotes: '理性思考',
    meaning: '力量、意志、自信',
    keywords: ['自我', '力量', '意志', '成就'],
    message: '相信自己的力量，勇敢地追求目標。'
  },
  {
    id: 4,
    name: '心輪',
    english: 'Heart Chakra',
    color: '綠色－檸檬香茅',
    colorCode: '#6CBB5A',
    emoji: '💚',
    quotes: '包容轉念',
    meaning: '愛、慈悲、寬諕',
    keywords: ['愛', '同理心', '寬諕', '和諧'],
    message: '打開你的心，用愛與慈悲對待自己和他人。'
  },
  {
    id: 5,
    name: '上心輪',
    english: 'Upper Heart Chakra',
    color: '粉色－粉紅玫瑰',
    colorCode: '#EE86A8',
    emoji: '🩷',
    quotes: '快樂開心',
    meaning: '快樂、人際交流、愛的傳遞',
    keywords: ['快樂', '開心', '人脈', '緣分'],
    message: '保持快樂好心情，讓人際關係自然轉動。'
  },
  {
    id: 6,
    name: '喉輪',
    english: 'Throat Chakra',
    color: '藍色－迷迭香',
    colorCode: '#4444FF',
    emoji: '💙',
    quotes: '慎言敢言',
    meaning: '溝通、表達、真實',
    keywords: ['表達', '真理', '溝通', '聲音'],
    message: '誠實地表達你的想法，說出你的真相。'
  },
  {
    id: 7,
    name: '眉心輪',
    english: 'Third Eye Chakra',
    color: '紫色－薏衣草',
    colorCode: '#8800FF',
    emoji: '💜',
    quotes: '智慧觀照',
    meaning: '直覺、智慧、洞察',
    keywords: ['直覺', '智慧', '靈感', '洞察'],
    message: '相信你的直覺，用內在智慧看清真相。'
  },
  {
    id: 8,
    name: '頂輪',
    english: 'Crown Chakra',
    color: '白色－粉紅蓮花／茉莉花',
    colorCode: '#8C9091',
    emoji: '🤍',
    quotes: '學習放下',
    meaning: '平衡、整合、完整',
    keywords: ['平衡', '整合', '和諧', '放下'],
    message: '所有脈輪達到平衡，你已經完整了。'
  }
];

/**
 * 随機抽一張卡
 * @returns {Object} 隨機選擇的卡片
 */
function drawRandomCard() {
  const randomIndex = Math.floor(Math.random() * CHAKRA_CARDS.length);
  return CHAKRA_CARDS[randomIndex];
}

/**
 * 根據ID獲取卡片
 * @param {number} id - 卡片ID
 * @returns {Object|null} 卡片或null
 */
function getCardById(id) {
  return CHAKRA_CARDS.find(card => card.id === id) || null;
}

/**
 * 獲取所有卡片
 * @returns {Array} 所有卡片陣列
 */
function getAllCards() {
  return CHAKRA_CARDS;
}

module.exports = {
  drawRandomCard,
  getCardById,
  getAllCards,
  CHAKRA_CARDS
};
