<template>
  <div class="user-section flex text-sm lg:text-base max-w-full">
    <template v-if="!$auth.user">
      <NuxtLink
        to="/login"
        class="
          hidden
          lg:block
          uppercase
          px-4
          hover:bg-primary-700
          focus:bg-primary-700
        "
      >
        {{ $t('login.title') }}
      </NuxtLink>
    </template>
    <template v-else>
      <NuxtLink
        v-if="$auth.user.roles.includes('admin')"
        to="/admin"
        class="
          hidden
          lg:block
          px-4
          hover:bg-primary-700
          focus:bg-primary-700
          truncate
        "
      >
        {{ $t('admin.title') }}
      </NuxtLink>
      <NuxtLink
        to="/user"
        class="px-4 hover:bg-primary-700 focus:bg-primary-700 truncate"
      >
        {{ $auth.user.name }}
      </NuxtLink>
      <button
        aria-label="log out"
        class="
          hidden
          lg:block
          cursor-pointer
          whitespace-nowrap
          uppercase
          px-4
          hover:bg-primary-700
          focus:bg-primary-700
        "
        @click="logout"
      >
        {{ $t('logout') }}
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
})
</script>

<style lang="postcss" scoped>
/* Fix for vertical center of NuxtLinks */
.user-section {
  & a {
    line-height: 64px;
  }
}
</style>
