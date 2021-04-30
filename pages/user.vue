<template>
  <div>
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
        class="button my-2 self-center inline-flex items-center uppercase tracking-wide"
      >
        <span v-if="!isLoading">{{ $t('edit_account.update') }}</span>
        <template v-else>
          <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
          {{ $t('edit_account.updating') }}
        </template>
      </button>
      <button
        aria-label="delete"
        class="mt-4 button red self-center"
        @click.prevent="openDeleteModal = true"
      >
        {{ $t('edit_account.delete') }}
      </button>
    </Form>

    <Modal :show="openDeleteModal" @close="() => (openDeleteModal = false)">
      <h3 class="text-lg font-semibold mb-6">
        {{ $t('edit_account.sure_delete') }}
      </h3>
      <div class="self-end">
        <button class="button" @click="openDeleteModal = false">
          {{ $t('edit_account.cancel_delete') }}
        </button>
        <button class="button red" @click="deleteUser">
          {{ $t('edit_account.confirm_delete') }}
        </button>
      </div>
    </Modal>
  </div>
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
    openDeleteModal: boolean
  } {
    return {
      fieldErrors: [],
      globalErrors: [],
      isLoading: false,
      userInfo: {},
      openDeleteModal: false,
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

    deleteUser() {
      this.$api.users
        ._id(this.$auth.user!.id as string)
        .$delete()
        .then(() => {
          this.openDeleteModal = false
          this.$auth.logout()
        })
        .catch((err) => alert(err.response.data.message))
    },
  },
})
</script>
