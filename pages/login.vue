<template>
  <div
    class="max-w-md mt-10 rounded-lg bg-white mx-auto shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">Login</h1>
    <form class="flex flex-col" @submit.prevent="login">
      <label for="usernameOrEmail">Username or email</label>
      <input
        v-model="usernameOrEmail"
        name="usernameOrEmail"
        type="text"
        placeholder="AlphonseBrown37 or alphonse.brown37@gmail.com"
        required
      />
      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        name="password"
        placeholder="Qu3lqUeCh0sedEloNg"
        required
      />
      <button class="my-2 uppercase tracking-widest">Login</button>
    </form>
    <p class="ml-auto mt-5">
      Don't have an account yet ? Go to
      <NuxtLink to="/signup" class="text-blue-600 hover:underline"
        >sign up</NuxtLink
      >
    </p>
  </div>
</template>

<script>
export default {
  transition(to) {
    if (to.name === 'signup') {
      return 'slide-left'
    }
  },
  data() {
    return {
      usernameOrEmail: '',
      password: '',
    }
  },

  methods: {
    login() {
      const config = {
        headers: {
          Accept: 'application/json',
        },
      }
      const { usernameOrEmail, password } = this
      this.$axios
        .$post(
          '/users/login',
          {
            usernameOrEmail,
            password,
          },
          config
        )
        .then(console.log)
        .catch(console.error)
    },
  },
}
</script>

<style></style>
