<template>
  <Form :title="$t('login.title')" :errors="errors" @submit="login">
    <InputField
      v-model="loginInfo.usernameOrEmail"
      name="usernameOrEmail"
      :label="$t('login.username_or_email')"
      :errors="errors"
    />
    <InputField
      v-model="loginInfo.password"
      name="password"
      type="password"
      :label="$t('login.password')"
      :errors="errors"
    />
    <button
      aria-label="log in"
      class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
    >
      <span v-if="!isLoading">{{ $t('login.login') }}</span>
      <template v-else>
        <Spinner class="h-5 w-5 mr-2"></Spinner>
        {{ $t('login.logging_in') }}
      </template>
    </button>
    <template slot="bottom">
      {{ $t('login.no_account') }}
      <NuxtLink
        to="/signup"
        class="text-blue-600 dark:text-blue-400 hover:underline"
        >{{ $t('login.signup') }}</NuxtLink
      >
    </template>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormError } from '~/types'

export default Vue.extend({
  transition(to) {
    if (to.name?.startsWith('signup')) {
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
    errors: FormError[]
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
        // Clear errors and reset them in the next tick to force transition again
        this.errors = []
        this.$nextTick(() => {
          this.errors = err?.response?.data?.errors || [
            { field: 'global', message: err?.response?.data || err.message },
          ]
        })
      } finally {
        this.isLoading = false
      }
    },
  },
})
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}
</style>
