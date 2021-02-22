import { bot, botState } from '../index.js';

const getPretence = (chatId, UserFullName, userAddress, respondenFullName, respondentAddress) => {
  bot.sendMessage(chatId,
    `Отправитель: ${UserFullName}, проживающий по адресу: ${userAddress}. 
  получатель: ${respondenFullName}, проживающий по адресу: ${respondentAddress}.`
  );
}

//имя пользователя
//адрес пользователя

//имя ответчика
//адрес ответчика




/*

//==========================================

const getPretence = (chatId) => {
// данные пользователя собираем тут:

  const userData = {
    fullName: null,
    setFullName(fullNameString) {
        this.fullName = fullNameString;
    },
    getFullName() {
      return this.fullName;
    },
    address: null,
    setAddress(address) {
      this.address = address;
    },
    getAddress() {
      return this.address;
    },
  };

  const getUserFullName = () => userData.getFullName();
  const getUserAddress = () => userData.getAddress();

//спрашиваем ФИО возвращаем:
  // const askFullName = () => {
  //   bot.sendMessage(chatId, 'Введите пожалуйста ваши фамилию, имя и отчество!');
  //   bot.on('message', (msg) => {
  //     userData.setFullName(msg.text);
  //     if (msg.text.toLowerCase() !== 'да') {
  //       bot.sendMessage(chatId, `Вы - ${getUserFullName()}?`);
  //     } else if (msg.text.toLowerCase() === 'да') {
  //       bot.sendMessage(chatId, `Отлично!`);
  //     }
  //   })
  // }

  const askFullName = () => {
    botState.setTask('asking name');
    bot.sendMessage(chatId, 'Введите пожалуйста ваши фамилию, имя и отчество!');   
    bot.on('message', (msg) => {
      userData.setFullName(msg.text);   
      bot.sendMessage(chatId, `Отлично! Вы - ${getUserFullName()}`);
      botState.setTask('ready to askAddress');
    });
  };

  //запрос адреса

  const askUserAddress = () => {
    botState.setTask('asking address');
    bot.sendMessage(chatId, 'Введите пожалуйста ваш адрес!');   
    bot.on('message', (msg) => {
      userData.setAddress(msg.text);   
      bot.sendMessage(chatId, `Отлично! Ваш адрес: '${getUserAddress()}'`);
    })
    botState.setTask(null);
  }

  bot.sendMessage(chatId, 'Чтобы подготовить документ я должен задать вам вопросы');
  setTimeout(askFullName, 1000);
  if (botState.getTask = 'ready to askAddress') {
    //askUserAddress();
  }
  
  
  

  //пока что вернём это но вообще должен быть объект со всеми данными
  botState.setState('giving result');
  return userData;
}

*/

export { getPretence };