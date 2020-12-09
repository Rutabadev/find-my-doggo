<template>
  <div class="user-section flex">
    <template v-if="!user">
      <NuxtLink
        to="/login"
        class="uppercase px-4 hover:bg-yellow-700 focus:bg-yellow-700 hidden md:block"
      >
        Log in
      </NuxtLink>
      <NuxtLink
        to="/signup"
        class="whitespace-nowrap uppercase px-4 hover:bg-yellow-700 focus:bg-yellow-700 hidden md:block"
        >Sign up</NuxtLink
      >
    </template>
    <template v-else>
      <button class="px-4 hover:bg-yellow-700 focus:bg-yellow-700">
        {{ user.name }}
      </button>
      <button
        class="cursor-pointer whitespace-nowrap uppercase px-4 hover:bg-yellow-700 focus:bg-yellow-700 hidden md:block"
        @click="logout"
      >
        Log out
      </button>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user
    },
  },

  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style lang="scss">
/* Fix for vertical center of NuxtLinks */
.user-section {
  a {
    line-height: 64px;
  }
}
</style>
