<template>
  <div>
    <div class="mx-auto max-w-6xl space-y-8">
      <h2 class="text-4xl font-medium">{{ $t('admin.title') }}</h2>
      <button class="button w-full sm:w-auto uppercase" @click="updateUsers">
        {{ $t('admin.update') }}
      </button>
      <div
        class="
          mx-auto
          max-w-md
          sm:max-w-none
          grid grid-cols-[repeat(auto-fit,minmax(37ch,1fr))]
          gap-4
          lg:gap-8
        "
      >
        <div
          v-for="(user, index) of users"
          :key="user.id"
          class="
            relative
            rounded-lg
            shadow
            px-6
            py-7
            bg-gray-50
            dark:bg-gray-700
          "
        >
          <div
            class="
              pb-2
              flex
              gap-4
              border-b-2 border-gray-200
              dark:border-gray-400
            "
          >
            <h3 class="flex-1 flex gap-2 text-lg font-medium">
              <span
                class="
                  self-center
                  rounded-full
                  px-2.5
                  bg-secondary-500
                  text-white
                  dark:text-gray-800
                "
              >
                {{ user.id }}
              </span>
              <input
                v-model="user.name"
                :title="user.name"
                type="text"
                class="flex-1 w-full min-w-0 truncate editable-text"
              />
            </h3>
            <label
              class="flex items-center gap-2 select-none cursor-pointer"
              :for="'emailValid' + index"
            >
              <input
                :id="'emailValid' + index"
                v-model="user.emailValid"
                class="
                  transform-gpu
                  translate-y-px
                  rounded-full
                  bg-transparent
                  text-primary-500
                  focus:ring-primary-400
                  dark:focus:ring-offset-gray-700
                  cursor-pointer
                "
                type="checkbox"
              />
              {{ $t('admin.email_valid') }}
            </label>
          </div>
          <div class="pt-4 space-y-2">
            <span>{{ $t('admin.email') }} :</span>
            <input v-model="user.email" type="text" class="editable-text" />
            <div>
              <span>{{ $t('admin.roles') }} :</span>
              <label
                v-for="role of availableRoles"
                :key="role.name + user.id"
                class="
                  ml-3
                  inline-flex
                  items-center
                  gap-2
                  transform
                  translate-y-0.5
                  select-none
                  cursor-pointer
                "
                :for="role.name + user.id"
              >
                <input
                  :id="role.name + user.id"
                  type="checkbox"
                  class="
                    rounded-full
                    text-primary-500
                    bg-transparent
                    focus:ring-primary-400
                    dark:focus:ring-offset-gray-700
                    cursor-pointer
                  "
                  :value="role"
                  :checked="user.roles.includes(role.name)"
                  @input="
                    () => {
                      const rolePosition = user.roles.indexOf(role.name)
                      rolePosition === -1
                        ? user.roles.push(role.name)
                        : user.roles.splice(rolePosition, 1)
                    }
                  "
                />
                {{ role.name }}
              </label>
            </div>
          </div>
          <button
            class="
              absolute
              top-0
              right-0
              rounded-full
              p-2
              text-red-500
              focus:ring-1 focus:ring-red-400
              focus:outline-none
            "
            @click="handleOpenDeleteModal(user.id)"
          >
            <IconCross class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
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
          @click="deleteUser(modalData.userId)"
        >
          <span v-if="!loading">{{ $t('edit_account.confirm_delete') }}</span>
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
import { Role, User } from '~/api/@types'
import { snackbarStore } from '~/store'

export default Vue.extend({
  async fetch() {
    const [users, availableRoles] = await Promise.all([
      (this.users = await this.$api.users.$get()),
      (this.availableRoles = await this.$api.roles.$get()),
    ])
    Object.assign(this, { users, availableRoles })
  },
  data(): {
    users: User[]
    availableRoles: Role[]
    openDeleteModal: boolean
    modalData: { userId: number } | undefined
    loading: boolean
  } {
    return {
      users: [],
      availableRoles: [],
      openDeleteModal: false,
      modalData: undefined,
      loading: false,
    }
  },

  methods: {
    async updateUsers(): Promise<void> {
      await Promise.all(
        this.users.map((user) =>
          this.$api.users._id(user.id).patch({ body: user })
        )
      )
        .then(() => snackbarStore.showMessage({ message: 'Users updated.' }))
        .catch(() => snackbarStore.showMessage({ message: 'Update failed.' }))
    },

    handleOpenDeleteModal(userId: number): void {
      this.openDeleteModal = true
      this.modalData = { userId }
    },

    async deleteUser(userId: number) {
      this.loading = true
      await this.$api.users
        ._id(userId)
        .$delete()
        .then(() => snackbarStore.showMessage({ message: 'User deleted.' }))
        .catch(() =>
          snackbarStore.showMessage({ message: 'User deletion failed.' })
        )
      this.users.splice(
        this.users.findIndex((user) => user.id === userId),
        1
      )
      this.loading = false
      this.modalData = undefined
    },
  },
})
</script>
