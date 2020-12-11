<template>
  <div
    class="max-w-sm mt-10 mx-auto rounded-lg bg-white dark:bg-gray-700 transition shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">Sign up</h1>
    <transition name="fade">
      <div
        v-if="errors.length"
        class="bg-red-200 dark:bg-red-500 p-2 mb-6 rounded-lg font-semibold"
      >
        <ul v-for="error in errors" :key="error">
          <li>{{ error.message || error }}</li>
        </ul>
      </div>
    </transition>
    <form class="flex flex-col" @submit.prevent="signup">
      <div class="field">
        <input
          v-model="signupInfo.name"
          type="text"
          name="username"
          placeholder=" "
        />
        <label for="username"
          >Username <span class="text-red-500">*</span></label
        >
      </div>
      <div class="field">
        <input
          v-model="signupInfo.email"
          type="email"
          name="email"
          placeholder=" "
        />
        <label for="email">Email</label>
      </div>
      <div class="field">
        <input
          v-model="signupInfo.password"
          type="password"
          name="password"
          placeholder=" "
        />
        <label for="password"
          >Password <span class="text-red-500">*</span></label
        >
      </div>
      <button
        class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
      >
        <span v-if="!isLoading">Sign up</span>
        <template v-else>
          <Spinner class="h-5 w-5 mr-2"></Spinner>
          Signing you up...
        </template>
      </button>
    </form>
    <p class="ml-auto mt-5">
      Already have an account ? Go to
      <NuxtLink
        to="/login"
        class="text-blue-600 dark:text-blue-400 hover:underline mt-5"
        >login</NuxtLink
      >
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { parseRequestErrors } from '~/utils'

export default Vue.extend({
  auth: false,

  transition(to) {
    if (to.name === 'login') {
      return 'slide-right'
    }
    return ''
  },

  data(): {
    isLoading: boolean
    signupInfo: {
      name: string
      email: string
      password: string
    }
    errors: string[]
  } {
    return {
      isLoading: false,
      signupInfo: {
        name: '',
        email: '',
        password: '',
      },
      errors: [],
    }
  },

  methods: {
    signup() {
      this.isLoading = true
      this.$axios
        .$post('/users', this.signupInfo)
        .then(() => {
          this.$router.push('/login')
        })
        .catch((err) => {
          this.errors = parseRequestErrors(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
})
</script>

<style>
input[type='email']:valid {
  @apply text-green-600;
}

input[type='email']:not(:placeholder-shown):invalid {
  @apply text-red-500;
}
</style>
