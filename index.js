import TelegramBot from 'node-telegram-bot-api';
import { getGuide, suggestGuide } from './src/guide.js';
import { test1, test2, test3 } from './src/data-manipulations.js'
import {
  askFullUserName,
  askUserAddress,
  askRespondentFullName,
  askRespondentAddress,
} from './src/askData.js'
import greet from './src/greet.js';
import makeData from './src/makeData.js';


const token = '1651168223:AAHiTfX2pAEsb4JAEmkxcy8VKwfL34OItSI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// =====================================================================
// состояния бота
// =====================================================================

const botState = {
  state: 'greeting',
  setState(state) {
    this.state = state;
  },
  getState() {
    return this.state;
  },
  task: false,
  setTask(task) {
    this.task = task;
  },
  getTask() {
    return this.task;
  },
};
// =====================================================================
// комманды
// =====================================================================

const botCommands = {
  start: '/start',
  guide: '/guide',
  pretence: '/get_pretence',
  quit: '/quit',
};

// =====================================================================
//                                  скрипты бота
// =====================================================================

// ------------------------------------------
// pretence script
// добавляем во внешний dataObject -> askName -> askAddress -> 
//   -> askRespondentName -> askRespondentAddress -> getPretence
// ------------------------------------------

const botScript = {
  currentScript: 'pretence',
  getCurrentScript() {
    return this.currentScript;
  },
  setCurrentScript(current) {
    this.currentScript = current;
  },
  pretence: {
    current: 0,
    step: [
      '...explanation text...',
      askFullUserName,
      askUserAddress,
      askRespondentFullName,
      askRespondentAddress,
      '',
    ],
  },
  greeting: {
    current: 0,
    step: [ 'helloMessage' ],
  },
  start: {
    current: 0,
    step: [],
  },
  guide: {
    current: 0,
    step: [],
  },
  getStep(script, i) {
    return this[script].step[i];
  },
  getCurrentStepIndexOf(script) {
    return this[script].current;
  },
  setCurrentStep(script, i) {
    this[script].current = i;
  },
  incrementCurrentStep(script) {
    this[script].current += 1;
  }
};

const fireScript = (scriptname) => botScript.setCurrentScript(scriptname);
const currentScript = () => botScript.getCurrentScript();
const currentStepOf = (scriptname) => botScript.getCurrentStepIndexOf(scriptname);
const executeStep = (scriptname, index) => botScript.getStep(scriptname, index);
const stepShift = (scriptname) => botScript.incrementCurrentStep(scriptname);

// =====================================================================
//              данные пользователя для составления договора  
// =====================================================================

const data = makeData();

// =====================================================================
//                               тело беседы
// =====================================================================

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const textMessage = msg.text;
  const botSays = (text) => bot.sendMessage(chatId, `${text}`);
  
  //приветствие <=========

  if (textMessage === '/start') {
    fireScript('start');
    greet(chatId);
    botState.setState('waiting')
  }

  // if (botState.getState() === 'greeting') {
  //   greet(chatId);
  //   botState.setState('waiting')
  // }

  if (botState.getState() === 'waiting') {
    fireScript('waiting');
    suggestGuide(chatId);
    botState.setState(null);
  }

  // GUIDE <======

  if (textMessage === '/guide') {
    fireScript('guide');
    getGuide(chatId);
  }

  // PRETENCE PROCESS <====== 

  if (textMessage === '/get_pretence' || currentScript() === 'pretence') {
    fireScript('pretence');
    const stepIndex = currentStepOf('pretence');
    if (stepIndex === 0) {
      botSays('Отправьте мне ваши полные ФИО');
      stepShift('pretence');
    } else if (stepIndex === 1) {
      executeStep('pretence', stepIndex)(textMessage);
      stepShift('pretence');
      botSays('Теперь напишите мне ваш адрес!');
    } else if (stepIndex === 2) {
      executeStep('pretence', stepIndex)(textMessage);
      stepShift('pretence');
      botSays('Теперь напишите имя ответчика!');
    } else if (stepIndex === 3) {
      executeStep('pretence', stepIndex)(textMessage);
      stepShift('pretence');
      botSays('Теперь введите адрес ответчика!');
    } else if (stepIndex === 4) {
      executeStep('pretence', stepIndex)(textMessage);
      bot.sendDocument(chatId, 'https://akppservice.by/assets/files/Volkswagen%20Golf%20V%202004-%20%20Volkswagen%20Jetta%202006.pdf');
    }

    console.log('==message ===>', textMessage,'=== data =========> ', JSON.stringify(data));
  }

  
  //botSays(data.user.getFullName())
  // QUIT <==========

  if (textMessage === '/quit') {
    suggestGuide(chatId);
  }
});
bot.on("polling_error", (err) => console.log(err));

export {
  bot,
  botState,
  botCommands,
  data,
};