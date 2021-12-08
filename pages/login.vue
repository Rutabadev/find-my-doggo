<template>
  <Form :title="$t('login.title')" :errors="globalErrors" @submit="login">
    <FormInputField
      v-model="loginInfo.email"
      name="email"
      :label="$t('login.email')"
      :errors="fieldErrors"
    />
    <FormInputField
      v-model="loginInfo.password"
      name="password"
      type="password"
      :label="$t('login.password')"
      :errors="fieldErrors"
    />
    <button
      aria-label="log in"
      class="button flex justify-center items-center uppercase tracking-wide"
    >
      <span v-if="!isLoading">{{ $t('login.login') }}</span>
      <template v-else>
        <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
        {{ $t('login.logging_in') }}
      </template>
    </button>
    <template slot="bottom">
      <p>
        <NuxtLink to="/forgot-password" class="link">
          {{ $t('login.forgot') }}
        </NuxtLink>
      </p>

      <p class="mt-4">
        {{ $t('login.no_account') }}
        <NuxtLink to="/create-account" class="link">
          {{ $t('login.signup') }}
        </NuxtLink>
      </p>
    </template>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { LoginUserDto } from '~/api/@types'
import { handleFormErrors } from '~/utils'

export default Vue.extend({
  transition(to) {
    if (to.name?.startsWith('create-account')) {
      return 'slide-left'
    }
    return ''
  },

  data(): {
    isLoading: boolean
    loginInfo: LoginUserDto
    fieldErrors: string[]
    globalErrors: string[]
  } {
    return {
      isLoading: false,
      loginInfo: {
        email: '',
        password: '',
      },
      fieldErrors: [],
      globalErrors: [],
    }
  },

  methods: {
    async login() {
      this.isLoading = true
      this.fieldErrors = []
      this.globalErrors = []
      try {
        await this.$auth.loginWith('local', {
          data: this.loginInfo,
        })
      } catch (error: any) {
        handleFormErrors(this, error)
      }
      this.isLoading = false
    },
  },
})
</script>

<style lang="postcss" scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}

.slide-left-leave-to {
  --inversed-slide-distance: calc(var(--slide-distance) * -1);
  opacity: 0;
  transform: translate3d(var(--inversed-slide-distance), 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}
</style>
