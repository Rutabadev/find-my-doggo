<template>
  <Form :title="$t('create_account.title')" :errors="errors" @submit="signup">
    <InputField
      v-model="signupInfo.name"
      name="name"
      required
      :label="$t('create_account.username')"
      :errors="errors"
    />
    <InputField
      v-model="signupInfo.email"
      name="email"
      type="email"
      autocomplete="email"
      :label="$t('create_account.email')"
      :errors="errors"
    />
    <InputField
      v-model="signupInfo.password"
      name="password"
      type="password"
      autocomplete="new-password"
      required
      :label="$t('create_account.password')"
      :errors="errors"
    />
    <button
      aria-label="sign up"
      class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
    >
      <span v-if="!isLoading">{{ $t('create_account.create') }}</span>
      <template v-else>
        <Spinner class="h-5 w-5 mr-2"></Spinner>
        {{ $t('create_account.creating') }}
      </template>
    </button>
    <template slot="bottom">
      {{ $t('create_account.already') }}
      <NuxtLink
        to="/login"
        class="text-blue-600 dark:text-blue-400 hover:underline mt-5"
        >{{ $t('create_account.login') }}</NuxtLink
      >
    </template>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { removeEmptyAttributes } from '~/utils'

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
      const newUser: any = removeEmptyAttributes(this.signupInfo)
      this.$axios
        .$post('/users', newUser)
        .then(() => {
          this.$router.push('/login')
        })
        .catch((err) => {
          // Clear errors and reset them in the next tick to force transition again
          this.errors = []
          this.$nextTick(() => {
            this.errors = err?.response?.data?.errors || [
              { field: 'global', message: err.message },
            ]
          })
        })
        .finally(() => (this.isLoading = false))
    },
  },
})
</script>

<style lang="scss">
.slide {
  &-right-enter-active,
  &-right-leave-active {
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
  }
  &-right-leave-to {
    opacity: 0;
    transform: translate3d(var(--slide-distance), 0, 0);
  }
  &-right-enter {
    opacity: 0;
    transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
  }
}

input[type='email'] {
  &:valid {
    @apply text-green-600;
  }

  &:not(:placeholder-shown):invalid {
    @apply text-red-500;
  }

  .dark & {
    &:valid {
      @apply text-green-400;
    }

    &:not(:placeholder-shown):invalid {
      @apply text-red-400;
    }
  }
}
</style>
