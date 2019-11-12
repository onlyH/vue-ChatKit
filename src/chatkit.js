// 过@pusher/chatkit-client包与ChatKit服务进行交互。·
import {ChatManager, TokenProvider} from '@pusher/chatkit-client'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10

let currentUser = null
let activeRoom = null

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({url: TOKEN_URL}),
    userId
  })
  currentUser = await chatManager.connect()
  return currentUser
}

export default {
  connectUser
}
//将MESSAGE_LIMIT常量转换为数字，因为默认情况下，process.env对象强制其所有属性均为字符串类型。
//
// 插入以下代码src/store/mutations：
