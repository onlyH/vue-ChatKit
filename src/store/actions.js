import chatkit from "../chatkit";

function handleError(commit, error) {
  const messsage = error.message || error.info.error_description;
  commit('setError', messsage)
}


export default {
  async login({commit, state}, userId) {
    try {
      commit('setError', '')
      commit('setLoading', true)
      const currentUser = await chatkit.connectUser(userId)
      commit('setUser', {
        username: currentUser.id,
        name: currentUser.name
      })
      commit('setReconnect', false)
      console.log(state.user)
      //保存存储中的用户房间列表
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }))
      commit('setRooms', rooms)
      //为用户预订房间
      const activeRoom = state.activeRoom || rooms[0] //选择最后一个使用过的房间，或第一个
      commit('setActiveRoom', {
        id: activeRoom.id,
        name: activeRoom.name
      });
      await chatkit.subscribeToRoom(activeRoom.id)
      return true
    } catch (e) {
      handleError(commit, e)
    } finally {
      commit('setLoading', false)
    }
  },
//  允许用户更改房间
  async changeRoom({commit}, roomId) {
    try {
      const {id, name} = await chatkit.subscribeToRoom(roomId)
      commit('setActiveRoom', {id, name})
    } catch (e) {
      handleError(commit, e)
    }
  },
//  处理诸如错误处理和加载状态通知之类的事情
  async sendMessage({commit}, message) {
    try {
      commit('setError', '')
      commit('setSending', true)
      const messageId = await chatkit.sendMessage(message)
      return messageId
    } catch (e) {
      handleError(commit, e)
    } finally {
      commit('setSending', false)
    }
  },
  async logout({commit}) {
    commit('reset')
    chatkit.disconnectUser()
    window.localStorage.clear()
  }
}
