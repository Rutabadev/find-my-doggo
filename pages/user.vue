<template>
  <Form title="User information" :errors="errors">
    <InputField
      v-model="userInfo.name"
      name="username"
      label="username"
      :errors="errors"
    />
    <InputField
      v-model="userInfo.email"
      name="email"
      label="email"
      :errors="errors"
    />
    <InputField
      v-model="userInfo.password"
      name="password"
      label="password"
      :errors="errors"
    />
    <button
      aria-label="log in"
      class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
    >
      <span v-if="!isLoading">Update</span>
      <template v-else>
        <Spinner class="h-5 w-5 mr-2"></Spinner>
        Updating
      </template>
    </button>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormError } from '~/types'

interface UserInfo {
  name: string
  email?: string
  password?: string
}

export default Vue.extend({
  data(): {
    errors: FormError[]
    isLoading: boolean
    userInfo: UserInfo
  } {
    return {
      errors: [],
      isLoading: false,
      userInfo: {
        name: '',
      },
    }
  },

  created() {
    this.userInfo = this.$auth.user
  },
})
</script>

<style></style>
