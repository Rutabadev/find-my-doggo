<template>
  <div class="mx-auto max-w-6xl">
    <h2 class="text-4xl font-medium">Admin</h2>
    <div
      class="mt-8 mx-auto max-w-md sm:max-w-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <div
        v-for="(user, index) of users"
        :key="user.name + index"
        class="rounded-lg shadow p-4 bg-gray-100 dark:bg-gray-700 divide-y-2 divide-gray-200 dark:divide-gray-500"
      >
        <div class="flex justify-between">
          <h3 class="pb-2 text-lg font-medium">
            [{{ user.id }}] {{ user.name }}
          </h3>
          <div>
            <label :for="'emailValid' + index"
              >Email valid
              <input
                :id="'emailValid' + index"
                class="ml-2 transform-gpu translate-y-px"
                type="checkbox"
                :checked="user.emailValid"
            /></label>
          </div>
        </div>
        <div class="pt-2">
          <p>Mail : {{ user.email }}</p>
          <p>Roles : {{ user.roles }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/api/@types'

export default Vue.extend({
  async fetch() {
    this.users = await this.$api.users.$get()
  },
  data(): {
    users: User[]
  } {
    return {
      users: [],
    }
  },
})
</script>
