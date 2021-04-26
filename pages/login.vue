<template>
  <Form :title="$t('login.title')" :errors="globalErrors" @submit="login">
    <FormInputField
      v-model="loginInfo.email"
      name="usernameOrEmail"
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
      class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
    >
      <span v-if="!isLoading">{{ $t('login.login') }}</span>
      <template v-else>
        <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
        {{ $t('login.logging_in') }}
      </template>
    </button>
    <template slot="bottom">
      {{ $t('login.no_account') }}
      <NuxtLink to="/create-account" class="link">
        {{ $t('login.signup') }}
      </NuxtLink>
    </template>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  transition(to) {
    if (to.name?.startsWith('create-account')) {
      return 'slide-left'
    }
    return ''
  },

  data(): {
    isLoading: boolean
    loginInfo: {
      email: string
      password: string
    }
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
      try {
        await this.$auth.loginWith('local', {
          data: this.loginInfo,
        })
      } catch (err) {
        // Clear errors and reset them in the next tick to force transition again
        this.fieldErrors = []
        this.globalErrors = []
        this.$nextTick(() => {
          Array.isArray(err.response.data.message)
            ? (this.fieldErrors = err.response.data.message)
            : (this.globalErrors = [err.response.data.message])
        })
      }
      this.isLoading = false
    },
  },
})
</script>

<style lang="scss">
.slide {
  &-left-enter-active,
  &-left-leave-active {
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
  }
  &-left-leave-to {
    --inversed-slide-distance: calc(var(--slide-distance) * -1);
    opacity: 0;
    transform: translate3d(var(--inversed-slide-distance), 0, 0);
  }
  &-left-enter {
    opacity: 0;
    transform: translate3d(var(--slide-distance), 0, 0);
  }
}
</style>
