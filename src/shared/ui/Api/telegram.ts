const TelegramBot = require('node-telegram-bot-api');
const token = 'ВАШ_ТОКЕН';
const bot = new TelegramBot(token, { polling: true });

export const test = () => {
  bot.onText(/\/startgame/, (msg: { chat: { id: number } }) => {
    const chatId = msg.chat.id;
    // Здесь можно запустить вашу игру или отправить сообщение-приглашение
    bot.sendMessage(chatId, 'Давайте начнем игру!');
  });
};
