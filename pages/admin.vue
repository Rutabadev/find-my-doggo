<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <h2 class="text-4xl font-medium">Admin</h2>
    <button class="button w-full sm:w-auto" @click="updateUsers">
      {{ $t('admin.update') }}
    </button>
    <div
      class="mx-auto max-w-md sm:max-w-none grid gap-4 lg:gap-x-8"
      style="grid-template-columns: repeat(auto-fit, minmax(37ch, 1fr))"
    >
      <div
        v-for="(user, index) of users"
        :key="user.name + index"
        class="rounded-lg shadow p-4 bg-gray-50 dark:bg-gray-700 divide-y-2 divide-gray-200 dark:divide-gray-500"
      >
        <div class="flex gap-4">
          <h3 class="flex-1 flex gap-2 text-lg font-medium">
            <span
              class="rounded-full px-2.5 bg-secondary-500 text-white inline-grid place-content-center"
              >{{ user.id }}</span
            >
            <input
              v-model="user.name"
              :title="user.name"
              type="text"
              class="flex-1 w-full min-w-0 truncate"
            />
          </h3>
          <div>
            <label class="whitespace-nowrap" :for="'emailValid' + index"
              >{{ $t('admin.email_valid') }}
              <input
                :id="'emailValid' + index"
                v-model="user.emailValid"
                class="ml-2 transform-gpu translate-y-px"
                type="checkbox"
            /></label>
          </div>
        </div>
        <div class="pt-2">
          <label
            >{{ $t('admin.mail') }} : <input v-model="user.email" type="text" />
          </label>
          <div>
            {{ $t('admin.roles') }} :
            <label
              v-for="role of availableRoles"
              :key="role + user.id"
              :for="role + user.id"
            >
              <input
                :id="role + user.id"
                type="checkbox"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Role, User } from '~/api/@types'

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
  } {
    return {
      users: [],
      availableRoles: [],
    }
  },

  methods: {
    async updateUsers(): Promise<void> {
      await Promise.all(
        this.users.map((user) =>
          this.$api.users._id(user.id).patch({ body: user })
        )
      )
    },
  },
})
</script>
