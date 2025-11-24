/**
 * Flex Message 服務 - 為 LINE Bot 創建漂亮的卡片顯示
 * 使用 LINE Flex Message 格式展示禪卡
 */

/**
 * 創建單張卡片的 Flex Message
 * @param {Object} card - 卡片資料
 * @returns {Object} LINE Flex Message 物件
 */
function createCardFlexMessage(card) {
  return {
    type: 'bubble',
    size: 'mega',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: card.emoji,
              size: '5xl',
              align: 'center',
              margin: 'md'
            },
            {
              type: 'text',
              text: card.name,
              weight: 'bold',
              size: 'xl',
              align: 'center',
              color: card.colorCode
            },
            {
              type: 'text',
              text: card.english,
              size: 'sm',
              align: 'center',
              color: '#999999',
              margin: 'md'
            }
          ],
          paddingAll: 'xl',
          backgroundColor: card.colorCode + '20',
          cornerRadius: 'md'
        },
        {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: '✨ 四字轉語',
                  weight: 'bold',
                  size: 'sm',
                  color: '#555555',
                  flex: 0
                },
                {
                  type: 'text',
                  text: card.quotes,
                  size: 'lg',
                  weight: 'bold',
                  align: 'end',
                  color: card.colorCode
                }
              ]
            },
            {
              type: 'separator',
              margin: 'md'
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: '🎯 意義',
                  weight: 'bold',
                  size: 'sm',
                  color: '#555555',
                  margin: 'md'
                },
                {
                  type: 'text',
                  text: card.meaning,
                  size: 'sm',
                  color: '#666666',
                  wrap: true,
                  margin: 'sm'
                }
              ]
            },
            {
              type: 'separator',
              margin: 'md'
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: '💬 給你的話',
                  weight: 'bold',
                  size: 'sm',
                  color: '#555555',
                  margin: 'md'
                },
                {
                  type: 'text',
                  text: card.message,
                  size: 'sm',
                  color: '#666666',
                  wrap: true,
                  margin: 'sm'
                }
              ]
            }
          ],
          paddingAll: 'xl'
        }
      ],
      paddingAll: 'none'
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: card.keywords.map(keyword => ({
            type: 'text',
            text: '#' + keyword,
            size: 'xs',
            color: '#999999',
            flex: 0,
            margin: 'sm'
          }))
        }
      ],
        {          type: 'button',
          action: {
            type: 'uri',
            label: '🌐 查看全部禅卡',
            uri: 'https://liff.line.me/2008559428-5jbG8160'
          },
          style: 'primary',
          color: card.colorCode,
          margin: 'md'
        }
      paddingAll: 'md'
    }
  };
}

/**
 * 創建所有卡片的 Carousel
 * @param {Array} cards - 所有卡片陣列
 * @returns {Object} LINE Carousel Flex Message
 */
function createCarouselFlexMessage(cards) {
  return {
    type: 'carousel',
    contents: cards.map(card => ({
      type: 'bubble',
      size: 'micro',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: card.emoji,
                size: '3xl',
                align: 'center'
              },
              {
                type: 'text',
                text: card.name,
                weight: 'bold',
                size: 'md',
                align: 'center',
                color: card.colorCode,
                margin: 'md'
              },
              {
                type: 'text',
                text: card.quotes,
                size: 'xs',
                align: 'center',
                color: '#666666',
                margin: 'sm'
              }
            ],
            backgroundColor: card.colorCode + '20',
            cornerRadius: 'md',
            paddingAll: 'lg'
          }
        ],
        paddingAll: 'none'
      }
    }))
  };
}

module.exports = {
  createCardFlexMessage,
  createCarouselFlexMessage
};
