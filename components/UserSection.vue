<template>
  <div class="user-section flex text-sm lg:text-base">
    <template v-if="!user">
      <NuxtLink
        to="/login"
        class="uppercase px-4 hover:bg-primary-700 focus:bg-primary-700 hidden md:block"
      >
        {{ $t('login.title') }}
      </NuxtLink>
    </template>
    <template v-else>
      <NuxtLink
        to="/user"
        class="px-4 hover:bg-primary-700 focus:bg-primary-700"
      >
        {{ user.name }}
      </NuxtLink>
      <button
        aria-label="log out"
        class="cursor-pointer whitespace-nowrap uppercase px-4 hover:bg-primary-700 focus:bg-primary-700 hidden md:block"
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
  computed: {
    user(): any {
      return this.$auth.user
    },
  },

  methods: {
    logout() {
      this.$auth.logout()
    },
  },
})
</script>

<style lang="scss" scoped>
/* Fix for vertical center of NuxtLinks */
.user-section {
  a {
    line-height: 64px;
  }
}
</style>
