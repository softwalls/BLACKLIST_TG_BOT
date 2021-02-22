import { bot, botState } from '../index.js';
export default (chatId) => {
  bot.sendMessage(chatId, `Привет! Столкнулся с обманом в сфере кино, ТВ, видеопроизводства?`);
  botState.setState('waiting');
};