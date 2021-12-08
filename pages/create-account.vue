<template>
  <Form
    :title="$t('create_account.title')"
    :errors="globalErrors"
    @submit="signup"
  >
    <FormInputField
      v-model="signupInfo.name"
      name="name"
      required
      :label="$t('create_account.username')"
      :errors="fieldErrors"
    />
    <FormInputField
      v-model="signupInfo.email"
      name="email"
      type="email"
      required
      autocomplete="email"
      :label="$t('create_account.email')"
      :errors="fieldErrors"
    />
    <FormInputField
      v-model="signupInfo.password"
      name="password"
      type="password"
      autocomplete="new-password"
      required
      :label="$t('create_account.password')"
      :errors="fieldErrors"
    />
    <button
      aria-label="sign up"
      class="button flex justify-center items-center uppercase tracking-wide"
    >
      <span v-if="!isLoading">{{ $t('create_account.create') }}</span>
      <template v-else>
        <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
        {{ $t('create_account.creating') }}
      </template>
    </button>
    <template slot="bottom">
      {{ $t('create_account.already') }}
      <NuxtLink to="/login" class="link">
        {{ $t('create_account.login') }}
      </NuxtLink>
    </template>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { CreateUserDto } from '~/api/@types'
import { handleFormErrors } from '~/utils'

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
    signupInfo: CreateUserDto
    fieldErrors: string[]
    globalErrors: string[]
  } {
    return {
      isLoading: false,
      signupInfo: {
        name: '',
        email: '',
        password: '',
      },
      fieldErrors: [],
      globalErrors: [],
    }
  },

  methods: {
    signup() {
      this.isLoading = true
      this.$api.users.signup
        .$post({ body: this.signupInfo })
        .then(() => {
          this.$router.push('/login')
        })
        .catch((error) => {
          handleFormErrors(this, error)
        })
        .finally(() => (this.isLoading = false))
    },
  },
})
</script>

<style lang="postcss">
/*
  This style must not be scoped
  because the enter animation starts before it is mounted
*/

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}

.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}

.slide-right-enter {
  --inversed-slide-distance: calc(var(--slide-distance) * -1);
  opacity: 0;
  transform: translate3d(var(--inversed-slide-distance), 0, 0);
}
</style>
