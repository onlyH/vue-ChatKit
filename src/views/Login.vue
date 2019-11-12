<template>
  <div class="login">
    <b-jumbotron
      header="vue.js Chat"
      lead="Powered by ChatKit SDK and Bootstrap-Vue"
      bg-variant="info"
      text-variant="white"
    >
      <p>for more information visit wensite</p>
      <b-btn
        target="_blank"
        href="https://pusher.com/chatkit"
      >More info
      </b-btn>
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col
          lg="4"
          md="3"
        />
        <b-col
          lg="4"
          md="6"
        >
          <LoginForm/>
        </b-col>
        <b-col
          lg="4"
          md="3"
        />

      </b-row>
    </b-container>
  </div>
</template>

<script>
    import LoginForm from "../components/LoginForm";

    export default {
        name: "Login",
        components: {LoginForm}
    }
</script>

<style scoped>

</style>
