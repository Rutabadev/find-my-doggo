<template>
  <Form :title="$t('edit_account.title')" :errors="errors" @submit="update">
    <FormInputField
      v-model="userInfo.name"
      name="username"
      :label="$t('create_account.username')"
      :errors="errors"
    />
    <FormInputField
      v-model="userInfo.email"
      name="email"
      type="email"
      :label="$t('create_account.email')"
      :errors="errors"
    />
    <FormInputField
      v-model="userInfo.password"
      name="password"
      type="password"
      :label="$t('create_account.password')"
      :errors="errors"
    />
    <button
      aria-label="log in"
      class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
    >
      <span v-if="!isLoading">{{ $t('edit_account.update') }}</span>
      <template v-else>
        <Spinner class="h-5 w-5 mr-2"></Spinner>
        {{ $t('edit_account.updating') }}
      </template>
    </button>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormError, User } from '~/types'

interface UserInfo {
  name: string
  email?: string
  password?: string
  roles?: string[]
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
    this.userInfo = {
      ...(this.$auth.user as User),
      roles: (this.$auth.user as User).roles.map(
        ({ value }: { value: string }) => value
      ),
    }
  },

  methods: {
    async update() {
      this.isLoading = true
      try {
        await this.$axios.put(`/users/${this.$auth?.user?.id}`, {
          ...this.userInfo,
        })
      } catch (err) {
        // Clear errors and reset them in the next tick to force transition again
        this.errors = []
        this.$nextTick(() => {
          this.errors = err?.response?.data?.errors || [
            { field: 'global', message: err?.response?.data || err.message },
          ]
        })
      }
      this.isLoading = false
      this.$auth.fetchUser()
    },
  },
})
</script>
