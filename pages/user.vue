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
        @click.prevent="openDeleteDialog = true"
      >
        {{ $t('edit_account.delete') }}
      </button>
    </Form>

    <div
      class="fixed z-10 inset-0 bg-black transition-opacity duration-200 motion-reduce:transition-none"
      :class="openDeleteDialog ? 'opacity-50' : 'opacity-0 pointer-events-none'"
    />
    <transition
      enter-active-class="transition duration-100 ease-out motion-reduce:transition-none"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in motion-reduce:transition-none"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="openDeleteDialog"
        class="fixed z-10 inset-0 grid place-content-center"
        @click="openDeleteDialog = false"
      >
        <div
          class="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col shadow-xl"
        >
          <h3 class="text-lg font-semibold mb-6">
            {{ $t('edit_account.sure_delete') }}
          </h3>
          <div class="self-end">
            <button class="button" @click="openDeleteDialog = false">
              {{ $t('edit_account.cancel_delete') }}
            </button>
            <button class="button red" @click="deleteUser">
              {{ $t('edit_account.confirm_delete') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
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
    openDeleteDialog: boolean
  } {
    return {
      fieldErrors: [],
      globalErrors: [],
      isLoading: false,
      userInfo: {},
      openDeleteDialog: false,
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
          this.openDeleteDialog = false
          this.$auth.logout()
        })
        .catch((err) => alert(err.response.data.message))
    },
  },
})
</script>
