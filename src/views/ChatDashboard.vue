<template>
  <div class="chat-dashboard">
    <ChatNavBar/>
    <b-container
      fluid
      class="ld-over"
      :class="{running:loading}"
    >
      <div class="ld ld-ring ld-spin">
        <b-row>
          <b-col cols="2">
            <RoomList/>
          </b-col>
          <b-col cols="8">
            <b-row>
              <b-col id="chat-content">
                <MessageList/>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <MessageList/>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="2">
            <UserList/>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
    import ChatNavBar from "../components/ChatNavBar";
    import RoomList from "../components/RoomList";
    import MessageForm from "../components/MessageForm";
    import MessageList from "../components/MessageList";
    import UserList from "../components/UserList";
    import {mapState} from 'vuex'

    export default {
        name: "ChatDashboard",
        components: {ChatNavBar, RoomList, MessageList, MessageForm, UserList},
        computed: {
            ...mapState([
                'loading'
            ])
        }
    }
</script>

<style scoped>

</style>
