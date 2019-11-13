// 过@pusher/chatkit-client包与ChatKit服务进行交互。·
import {ChatManager, TokenProvider} from '@pusher/chatkit-client'
import moment from "moment";
import store from './store/index'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10
//将MESSAGE_LIMIT常量转换为数字，因为默认情况下，process.env对象强制其所有属性均为字符串类型。

let currentUser = null
let activeRoom = null

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }))
  store.commit('setUser', members)
}
async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({url: TOKEN_URL}),
    userId
  })
  currentUser = await chatManager.connect()
  return currentUser
}


/*
    onMessage 接收消息
    onPresenceChanged 用户登录或注销时收到事件
    onUserStartedTyping 收到用户正在输入的事件
    onUserStoppedTyping 收到用户停止输入的事件
*/
async function subscribeToRoom(roomId) {
  store.commit('clearChatRoom');
  activeRoom = await currentUser.subscribeToRoom({
    roomId,
    message_limit: MESSAGE_LIMIT,
    hooks: {
      onMessage: message => {
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
        })
      },
      onPresenceChanged: () => {
        setMembers()
      },
      onUserStartedTyping: user => {
        store.commit('setUserTyping', user.id)
        //需要MessageForm在用户输入内容时发出输入事件。
      },
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null)
      }
    }
  })
  setMembers();
  return activeRoom
}

//发送消息，检测用户键入并注销
async function sendMessage(text) {
  const messageId = await currentUser.sendMessage({
    text,
    roomId: activeRoom.id
  })
  return messageId
}

export function isTyping(roomId) {
  currentUser.isTypingIn({roomId})
}

function disconnectUser() {
  currentUser.disconnect()
}
export default {
  connectUser,
  subscribeToRoom,
  sendMessage,
  disconnectUser
}

/*
* sendMessage和disconnectUser捆绑在ChatKit的模块导出中，
* 但isTyping功能将单独导出。
* 这是为了MessageForm直接发送键入事件，而无需涉及Vuex存储。
* 对于sendMessage和disconnectUser，我们需要更新vuex，
* 以处理诸如错误处理和加载状态通知之类的事情
* */
