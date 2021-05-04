<template>
  <Form
    :title="$t('reset_password.title')"
    :errors="globalErrors"
    @submit="resetPassword"
  >
    <FormInputField
      v-model="changePasswordInfo.password"
      name="password"
      type="password"
      :label="$t('login.password')"
      :errors="fieldErrors"
    />
    <button
      aria-label="reset password"
      class="button my-2 self-center inline-flex items-center uppercase tracking-wide"
    >
      <span v-if="!isLoading">{{ $t('reset_password.reset') }}</span>
      <template v-else>
        <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
        {{ $t('reset_password.resetting') }}
      </template>
    </button>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { ChangePasswordDto } from '~/api/@types'
import { handleFormErrors } from '~/utils'

export default Vue.extend({
  auth: false,
  asyncData({ params }) {
    const token = params.token
    return {
      changePasswordInfo: {
        uuid: token,
      },
    }
  },
  data(): {
    changePasswordInfo: ChangePasswordDto
    fieldErrors: string[]
    globalErrors: string[]
    isLoading: boolean
  } {
    return {
      isLoading: false,
      fieldErrors: [],
      globalErrors: [],
      changePasswordInfo: {
        password: '',
        uuid: '',
      },
    }
  },

  methods: {
    async resetPassword() {
      this.isLoading = true
      let ok = true
      try {
        await this.$api.users.reset_password.$post({
          body: this.changePasswordInfo,
        })
      } catch (error) {
        ok = false
        handleFormErrors(this, error)
      }
      this.isLoading = false
      if (ok) {
        this.$router.push({ path: '/login' })
      }
    },
  },
})
</script>
