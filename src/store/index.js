import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
//vuex-persist软件包确保在页面重新加载或刷新之间保存我们的Vuex状态。
export default {
  state: {
    loading: false, //确定是否应运行CSS加载器
    sending: false,
    error: 'Relax! This is just a drill error message', //存储刚刚发生的错误的信息
    user:
      {
        username: 'Jack',
        name: 'Jack Sparrow'
      },
    reconnect: false,
    activeRoom: {
      id: '124'
    },
    rooms: [
      {
        id: '123',
        name: 'Ships'
      },
      {
        id: '124',
        name: 'Treasure'
      }
    ],
    users: [
      {
        username: 'Jack',
        name: 'Jack Sparrow',
        presence: 'online'
      },
      {
        username: 'Barbossa',
        name: 'Hector Barbossa',
        presence: 'offline'
      }
    ],
    messages: [
      {
        username: 'Jack',
        date: '11/12/1644',
        text: 'Not all treasure is silver and gold mate'
      },
      {
        username: 'Jack',
        date: '12/12/1644',
        text: 'If you were waiting for the opportune moment, that was it'
      },
      {
        username: 'Hector',
        date: '12/12/1644',
        text: 'You know Jack, I thought I had you figured out'
      }
    ],
    userTyping: null
  },
  mutations,
  actions,
  getters: {
    hasError: state => state.error ? true : false
  },
  plugins: [vuexLocal.plugin],
  strict: debug
}
