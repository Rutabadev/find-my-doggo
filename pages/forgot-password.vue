<template>
  <Form
    :title="$t('forgot_password.title')"
    :errors="globalErrors"
    @submit="forgotPassword"
  >
    <FormInputField
      v-model="forgotPasswordInfo.email"
      name="email"
      type="email"
      :label="$t('login.email')"
      :errors="fieldErrors"
    />
    <button
      aria-label="send mail"
      class="button flex justify-center items-center uppercase tracking-wide"
    >
      <span v-if="!isLoading">{{ $t('forgot_password.send') }}</span>
      <template v-else>
        <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
        {{ $t('forgot_password.sending') }}
      </template>
    </button>
    <p v-if="showCheckEmail" class="mt-4 text-center">
      {{ $t('forgot_password.check_email') }}
    </p>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { ForgotPasswordDto } from '~/api/@types'
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
    forgotPasswordInfo: ForgotPasswordDto
    fieldErrors: string[]
    globalErrors: string[]
    isLoading: boolean
    showCheckEmail: boolean
  } {
    return {
      isLoading: false,
      showCheckEmail: false,
      fieldErrors: [],
      globalErrors: [],
      forgotPasswordInfo: { email: '' },
    }
  },

  methods: {
    async forgotPassword() {
      this.isLoading = true
      let ok = true
      try {
        await this.$api.users.forgot_password.$post({
          body: this.forgotPasswordInfo,
        })
      } catch (error) {
        ok = false
        handleFormErrors(this, error)
      }
      this.isLoading = false
      if (ok) {
        this.showCheckEmail = true
      }
    },
  },
})
</script>
