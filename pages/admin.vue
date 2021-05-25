<template>
  <div class="mx-auto max-w-6xl space-y-8">
    <h2 class="text-4xl font-medium">{{ $t('admin.title') }}</h2>
    <button class="button w-full sm:w-auto uppercase" @click="updateUsers">
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
        <div class="mb-2 flex gap-4">
          <h3 class="flex-1 flex gap-2 text-lg font-medium">
            <span
              class="self-center rounded-full px-2.5 bg-secondary-500 text-white"
            >
              {{ user.id }}
            </span>
            <input
              v-model="user.name"
              :title="user.name"
              type="text"
              class="flex-1 w-full min-w-0 truncate bg-transparent border-none focus:ring-2 focus:ring-primary-400 rounded"
            />
          </h3>
          <label class="flex items-center gap-2" :for="'emailValid' + index">
            <input
              :id="'emailValid' + index"
              v-model="user.emailValid"
              class="transform-gpu translate-y-px rounded-full bg-transparent text-primary-500 focus:ring-primary-400 dark:focus:ring-offset-gray-700"
              type="checkbox"
            />
            {{ $t('admin.email_valid') }}
          </label>
        </div>
        <div class="pt-4 space-y-2">
          <label
            >{{ $t('admin.email') }} :
            <input
              v-model="user.email"
              type="text"
              class="bg-transparent border-none focus:ring-2 focus:ring-primary-400 rounded"
            />
          </label>
          <div>
            {{ $t('admin.roles') }} :
            <label
              v-for="role of availableRoles"
              :key="role.name + user.id"
              class="ml-3 inline-flex items-center gap-2 transform translate-y-0.5"
              :for="role.name + user.id"
            >
              <input
                :id="role.name + user.id"
                type="checkbox"
                class="rounded-full text-primary-500 bg-transparent focus:ring-primary-400 dark:focus:ring-offset-gray-700"
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
