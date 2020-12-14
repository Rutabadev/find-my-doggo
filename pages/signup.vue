<template>
  <Form :title="$t('signup.title')" :errors="errors" @submit="signup">
    <InputField
      v-model="signupInfo.name"
      name="name"
      required
      :label="$t('signup.username')"
      :errors="errors"
    />
    <InputField
      v-model="signupInfo.email"
      name="email"
      :label="$t('signup.email')"
      :errors="errors"
    />
    <InputField
      v-model="signupInfo.password"
      name="password"
      required
      :label="$t('signup.password')"
      :errors="errors"
    />
    <button
      class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
    >
      <span v-if="!isLoading">{{ $t('signup.signup') }}</span>
      <template v-else>
        <Spinner class="h-5 w-5 mr-2"></Spinner>
        {{ $t('signup.signing_up') }}
      </template>
    </button>
    <template slot="bottom">
      {{ $t('signup.already') }}
      <NuxtLink
        to="/login"
        class="text-blue-600 dark:text-blue-400 hover:underline mt-5"
        >{{ $t('signup.login') }}</NuxtLink
      >
    </template>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'

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
