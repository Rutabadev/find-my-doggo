<template>
  <div
    class="max-w-md mt-10 rounded-lg bg-white mx-auto shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">Login</h1>
    <transition name="fade">
      <div
        v-if="errors.length"
        class="bg-red-200 p-2 mb-6 rounded-lg font-semibold"
      >
        <ul v-for="error in errors" :key="error">
          <li>{{ error.message || error }}</li>
        </ul>
      </div>
    </transition>
    <form class="flex flex-col" @submit.prevent="login">
      <label for="usernameOrEmail">Username or email</label>
      <input
        v-model="loginInfo.usernameOrEmail"
        name="usernameOrEmail"
        type="text"
        placeholder="AlphonseBrown37 or alphonse.brown37@gmail.com"
      />
      <label for="password">Password</label>
      <input
        v-model="loginInfo.password"
        type="password"
        name="password"
        placeholder="Qu3lqUeCh0sedEloNg"
      />
      <button class="button my-2 uppercase tracking-widest">Login</button>
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
      loginInfo: {
        usernameOrEmail: '',
        password: '',
      },
      errors: [],
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.loginInfo,
        })
      } catch (err) {
        this.errors = err?.response?.data?.errors?.map(
          ({ message }) => message
        ) ?? [err?.response?.data] ?? [err.message]
      }
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
