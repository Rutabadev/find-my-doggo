<template>
  <div
    class="max-w-sm mt-10 mx-auto rounded-lg bg-white dark:bg-gray-700 transition shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">Login</h1>
    <transition name="fade">
      <div
        v-if="errors.length"
        class="bg-red-200 dark:bg-red-500 p-2 mb-6 rounded-lg font-semibold"
      >
        <ul v-for="error in errors" :key="error">
          <li>{{ error }}</li>
        </ul>
      </div>
    </transition>
    <form class="flex flex-col" @submit.prevent="login">
      <div class="field">
        <input
          v-model="loginInfo.usernameOrEmail"
          name="usernameOrEmail"
          type="text"
          placeholder=" "
        />
        <label for="usernameOrEmail">Username or email</label>
      </div>
      <div class="field">
        <input
          v-model="loginInfo.password"
          type="password"
          name="password"
          placeholder=" "
        />
        <label for="password">Password</label>
      </div>
      <button
        class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
      >
        <span v-if="!isLoading">Login</span>
        <template v-else>
          <Spinner class="h-5 w-5 mr-2"></Spinner>
          Logging you in...
        </template>
      </button>
    </form>
    <p class="ml-auto mt-5">
      Don't have an account ? Go to
      <NuxtLink
        to="/signup"
        class="text-blue-600 dark:text-blue-400 hover:underline"
        >sign up</NuxtLink
      >
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { parseRequestErrors } from '~/utils'
export default Vue.extend({
  transition(to) {
    if (to.name === 'signup') {
      return 'slide-left'
    }
    return ''
  },

  data(): {
    isLoading: boolean
    loginInfo: {
      usernameOrEmail: string
      password: string
    }
    errors: string[]
  } {
    return {
      isLoading: false,
      loginInfo: {
        usernameOrEmail: '',
        password: '',
      },
      errors: [],
    }
  },

  methods: {
    async login() {
      this.isLoading = true
      try {
        await this.$auth.loginWith('local', {
          data: this.loginInfo,
        })
      } catch (err) {
        this.errors = parseRequestErrors(err)
      } finally {
        this.isLoading = false
      }
    },
  },
})
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
