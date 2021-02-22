import { data } from "../index.js";

/*
const askData = (chatId, msg) => {
  const data = {
    user: {
      fullName: 'Lesia',
      setFullName(fullNameString) {
         this.fullName = fullNameString;
      },
      getFullName() {
        return this.fullName;
      },
      address: 'homeadressik 1',
      setAddress(address) {
        this.address = address;
      },
      getAddress() {
        return this.address;
      },
    },
    respondent: {
      fullName: 'Tolik',
      setFullName(fullNameString) {
         this.fullName = fullNameString;
      },
      getFullName() {
        return this.fullName;
      },
      address: 'homeadressik 23',
      setAddress(address) {
        this.address = address;
      },
      getAddress() {
        return this.address;
      },
    },
  };
  return data;
}
*/
/*
const askData = (chatId, msg) => {
  //bot.sendMessage(msg.chat.id, msg.text);

  
  const data = {
    user: {
      fullName: 'Lesia',
      setFullName(fullNameString) {
        this.fullName = fullNameString;
      },
      getFullName() {
        return this.fullName;
      },
      address: 'homeadressik 1',
      setAddress(address) {
        this.address = address;
      },
      getAddress() {
        return this.address;
      },
    },
    respondent: {
      fullName: 'Tolik',
      setFullName(fullNameString) {
        this.fullName = fullNameString;
      },
      getFullName() {
        return this.fullName;
      },
      address: 'homeadressik 23',
      setAddress(address) {
        this.address = address;
      },
      getAddress() {
        return this.address;
      },
    },
  };
  
  const askQuestion = (msgObject, question) => {
    let answer;
    bot.sendMessage(msgObject.chat.id, question);
    bot.on('message', (msgObj) => {
      answer = 'ОТВЕТ'
      botState.setTask() === 'data is ready';
    });
    return answer;
  }
  const userNameQuestion = 'Ваши ФИО пожалуйста';
  data.user.setFullName(askQuestion(msg, userNameQuestion));
  //bot.sendMessage(msg.chat.id, msg);
  return data;
};
*/

const askFullUserName = function(userMessage) {
  data.user.setFullName(userMessage);
}

const askUserAddress = function(userMessage) {
  data.user.setAddress(userMessage);
}

const askRespondentFullName = function(userMessage) {
  data.user.setFullName.call(data.respondent, userMessage);
}

const askRespondentAddress = function(userMessage) {
  data.user.setAddress.call(data.respondent, userMessage);
}

export {
  askFullUserName,
  askUserAddress,
  askRespondentFullName,
  askRespondentAddress
};

