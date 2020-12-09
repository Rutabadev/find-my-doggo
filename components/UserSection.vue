<template>
  <div class="user-section">
    <template v-if="!user">
      <NuxtLink
        to="/login"
        class="uppercase px-4 hover:bg-yellow-700 focus:bg-yellow-700"
      >
        Log in
      </NuxtLink>
      <NuxtLink
        to="/signup"
        class="whitespace-nowrap uppercase px-4 hover:bg-yellow-700 focus:bg-yellow-700"
        >Sign up</NuxtLink
      >
      <div class="px-4 hidden sm:inline-block self-center">
        <User class="h-10"></User>
      </div>
    </template>
    <template v-else>
      <a class="px-4 hover:bg-yellow-700 focus:bg-yellow-700s">
        {{ user.name }}
      </a>
      <a
        class="cursor-pointer whitespace-nowrap uppercase px-4 hover:bg-yellow-700 focus:bg-yellow-700"
        @click="logout"
        >Log out</a
      >
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
