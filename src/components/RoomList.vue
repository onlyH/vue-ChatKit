<template>
  <div class="room-list">
    <h4>Channels</h4>
    <hr>
    <b-list-group v-if="activeRoom">
      <b-list-group-item
        v-for="room in rooms"
        :key="room.name"
        :action="activeRoom.id === room.id"
        @click="onchange(room)"
        href="#"
      >
        # {{room.name}}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "RoomList",
        computed: {
            ...mapState([
                'rooms',
                'activeRoom'
            ])
        },
        methods: {
            ...mapActions([
                'changeRoom'
            ]),
            onChange(room) {
                this.changeRoom(room.id)
            }
        }
    }
</script>

<style scoped>

</style>
