<template>
  <Form
    :title="$t('edit_account.title')"
    :errors="globalErrors"
    @submit="update"
  >
    <FormInputField
      v-model="userInfo.name"
      name="username"
      :label="$t('create_account.username')"
      :errors="fieldErrors"
    />
    <FormInputField
      v-model="userInfo.email"
      name="email"
      type="email"
      :label="$t('create_account.email')"
      :errors="fieldErrors"
    />
    <FormInputField
      v-model="userInfo.password"
      name="password"
      type="password"
      :label="$t('create_account.password')"
      :errors="fieldErrors"
    />
    <button
      aria-label="log in"
      class="button my-2 self-center inline-flex items-center uppercase tracking-widest"
    >
      <span v-if="!isLoading">{{ $t('edit_account.update') }}</span>
      <template v-else>
        <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
        {{ $t('edit_account.updating') }}
      </template>
    </button>
  </Form>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types'
import { UpdateUserDto } from '~/api/@types'
import { removeEmptyAttributes } from '~/utils'

export default Vue.extend({
  data(): {
    fieldErrors: string[]
    globalErrors: string[]
    isLoading: boolean
    userInfo: UpdateUserDto
  } {
    return {
      fieldErrors: [],
      globalErrors: [],
      isLoading: false,
      userInfo: {},
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
        // await this.$axios.put(`/users/${this.$auth?.user?.id}`, {
        //   ...this.userInfo,
        // })
        await this.$api.users
          ._id(this.$auth.user!.id as string)
          .$patch({ body: removeEmptyAttributes(this.userInfo) })
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
      this.$auth.fetchUser()
    },
  },
})
</script>
