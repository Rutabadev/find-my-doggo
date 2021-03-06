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
        aria-label="update"
        class="button flex justify-center items-center uppercase tracking-wide"
      >
        <span v-if="!loading.edit">{{ $t('edit_account.update') }}</span>
        <template v-else>
          <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
          {{ $t('edit_account.updating') }}
        </template>
      </button>
      <button
        aria-label="delete"
        class="button red uppercase tracking-wide"
        @click.prevent="openDeleteModal = true"
      >
        {{ $t('edit_account.delete') }}
      </button>
    </Form>

    <Modal
      :show="openDeleteModal"
      :initial-focus="() => $refs.initialFocus"
      @close="() => (openDeleteModal = false)"
    >
      <h3 class="text-lg font-semibold mb-6">
        {{ $t('edit_account.sure_delete') }}
      </h3>
      <div class="self-end flex gap-4">
        <button
          ref="initialFocus"
          class="button uppercase"
          @click="openDeleteModal = false"
        >
          {{ $t('edit_account.cancel_delete') }}
        </button>
        <button
          aria-label="delete"
          class="button red flex justify-center items-center uppercase"
          @click="deleteUser"
        >
          <span v-if="!loading.delete">{{
            $t('edit_account.confirm_delete')
          }}</span>
          <template v-else>
            <IconSpinner class="h-5 w-5 mr-2"></IconSpinner>
            {{ $t('edit_account.deleting') }}
          </template>
        </button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UpdateUserDto, User } from '~/api/@types'
import { handleFormErrors, removeEmptyAttributes } from '~/utils'
import { snackbarStore } from '~/store'

export default Vue.extend({
  data(): {
    fieldErrors: string[]
    globalErrors: string[]
    loading: {
      edit: boolean
      delete: boolean
    }
    userInfo: UpdateUserDto
    openDeleteModal: boolean
  } {
    return {
      fieldErrors: [],
      globalErrors: [],
      loading: {
        edit: false,
        delete: false,
      },
      userInfo: {},
      openDeleteModal: false,
    }
  },

  created() {
    this.userInfo = {
      ...(this.$auth.user as User),
    }
  },

  methods: {
    async update() {
      this.loading.edit = true
      try {
        await this.$api.users
          ._id(this.$auth.user!.id as number)
          .$patch({ body: removeEmptyAttributes(this.userInfo) })
      } catch (error) {
        handleFormErrors(this, error)
      }
      this.loading.edit = false
      this.$auth.fetchUser()
    },

    deleteUser() {
      this.loading.delete = true
      this.$api.users
        ._id(this.$auth.user!.id as number)
        .$delete()
        .then(() => {
          this.openDeleteModal = false
          this.$auth.logout()
          snackbarStore.showMessage({
            message: this.$t('edit_account.delete_success').toString(),
          })
        })
        .catch((err) => snackbarStore.showMessage(err.response.data.message))
        .finally(() => (this.loading.delete = false))
    },
  },
})
</script>
