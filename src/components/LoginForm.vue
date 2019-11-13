<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr>
    <b-form @submit.prevent="onSubmit">
<!--      <b-alert-->
<!--        variant="danger"-->
<!--        :show="hasError"-->
<!--      >{{error}}-->
<!--      </b-alert>-->
      <b-form-group
        id="userInputGroup"
        label="User Name"
        label-for="userInput"
      >
        <b-form-input
          id="userInput"
          type="text"
          placeholder="Enter user name"
          v-model="userId"
          autocomplete="off"
          :disabled="loading"
          @input="isTyping"
          required
        >
        </b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
        class="ld-ext-right"
        :class="{running:loading}"
        :disabled="isValid"
      >Login
        <div class="ld ld-ring ld-spin"></div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import {isTyping} from "../chatkit";

    export default {
        name: "LoginForm",
        data() {
            return {
                userId: '',
                message: ''
            }
        },
        computed: {
            isValid() {
                const result = this.userId.length < 3
                return result ? result : this.loading
            },
            ...mapState([
                'error',
                'user',
                'loading',
                'sending',
                'activeRoom'
            ]),
            ...mapGetters([
                'hasError'
            ])
        },
        methods: {
            ...mapActions([
                'sendMessage',
                'login'
            ]),
            async onSubmit() {
                const result = await this.sendMessage(this.message)
                if (result) {
                    this.message = ''
                }
            },
            //更新表单输入以发出键入事件
            async isTyping() {
                await isTyping(this.activeRoom.id)
            }
        }
    }
</script>

<style scoped>

</style>
