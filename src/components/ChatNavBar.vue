<template>
  <b-navbar
    id="char-navbar"
    toggleable="md"
    type="dark"
    variant="info"
  >
    <b-navbar-brand>
      Vue Chat
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{user.name}} |</b-nav-text>
      <b-nav-item
        active
        href="#"
        @click="onLogout"
      >Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
    import {mapActions, mapMutations, mapState} from 'vuex'

    export default {
        name: "ChatNavBar",
        computed: {
            ...mapState([
                'user',
                'reconnect'
            ])
        },
        methods: {
            ...mapActions([
                'logout',
                'login'
            ]),
            ...mapMutations([
                'setReconnect'
            ]),
            onLogout() {
                this.$router.push({path: '/'})
                this.logout()
            },
            unload() {
                if (this.user.username) {  //用户尚未注销
                    this.setReconnect(true)
                }
            }
        },
        mounted() {
            window.addEventListener('beforeunload', this.unload)
            if (this.reconnect) {
                this.login(this.user.username)
            }
        }
    }

    /*
    * 连接到ChatKit服务器的引用被重置为null。要解决此问题，
    * 我们需要执行重新连接操作。
    * 我们还需要一种方法来告诉我们的应用程序刚刚发生了页面重新加载，
    * 并且我们的应用程序需要重新连接才能继续正常运行
    * unload。页面刷新发生时，将调用此方法。
    * 它首先检查状态user.username已设置。
    * 如果已注册，则意味着用户尚未注销。
    * 状态reconnect设置为true。
    * mounted:
    * 每当ChatNavbar.vue渲染完成时，都会调用此方法。
    * 它首先为事件监听器分配一个处理程序，该事件监听器在页面卸载之前被调用。
    * 它还会检查是否state.reconnect已设置为true。
    * 如果是这样，则执行登录过程，从而将我们的聊天应用程序重新连接回我们的ChatKit服务。
    * */
</script>

<style scoped>
  #char-navbar {
    margin-bottom: 15px;
  }
</style>
