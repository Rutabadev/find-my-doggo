<template>
  <div
    class="max-w-sm mt-10 mx-auto rounded-lg bg-white dark:bg-gray-700 transition shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">{{ $t('signup.title') }}</h1>
    <FormErrors :errors="errors"></FormErrors>
    <form class="flex flex-col" @submit.prevent="signup">
      <div class="field">
        <input
          v-model="signupInfo.name"
          type="text"
          name="username"
          placeholder=" "
        />
        <label for="username"
          >{{ $t('signup.username') }}
          <span class="text-red-500">*</span></label
        >
      </div>
      <div class="field">
        <input
          v-model="signupInfo.email"
          type="email"
          name="email"
          placeholder=" "
        />
        <label for="email">{{ $t('signup.email') }}</label>
      </div>
      <div class="field">
        <input
          v-model="signupInfo.password"
          type="password"
          name="password"
          placeholder=" "
        />
        <label for="password"
          >{{ $t('signup.password') }}
          <span class="text-red-500">*</span></label
        >
      </div>
      <button
        class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
      >
        <span v-if="!isLoading">{{ $t('signup.signup') }}</span>
        <template v-else>
          <Spinner class="h-5 w-5 mr-2"></Spinner>
          {{ $t('signup.signing_up') }}
        </template>
      </button>
    </form>
    <p class="ml-auto mt-5">
      {{ $t('signup.already') }}
      <NuxtLink
        to="/login"
        class="text-blue-600 dark:text-blue-400 hover:underline mt-5"
        >{{ $t('signup.login') }}</NuxtLink
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
    if (to.name?.startsWith('login')) {
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
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
}

input[type='email']:valid {
  @apply text-green-600;
}

input[type='email']:not(:placeholder-shown):invalid {
  @apply text-red-500;
}
</style>
