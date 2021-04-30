<template>
  <h1 class="text-center text-xl font-bold">{{ message }}</h1>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidateEmailDto } from '~/api/@types'

export default Vue.extend({
  auth: false,
  asyncData({ params }) {
    const token = params.token
    return {
      validateEmailInfo: {
        uuid: token,
      },
    }
  },
  data(): {
    validateEmailInfo: ValidateEmailDto
    message: string
  } {
    return {
      validateEmailInfo: {
        uuid: '',
      },
      message: '',
    }
  },
  mounted(): void {
    this.$api.users.validate_email
      .$post({ body: this.validateEmailInfo })
      .then(() => (this.message = 'Email validated.'))
      .catch((err) => (this.message = err.response.data.message))
  },
})
</script>
