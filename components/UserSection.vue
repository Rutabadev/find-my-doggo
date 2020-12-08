<template>
  <div class="user-section hidden sm:flex">
    <template v-if="!user">
      <button class="uppercase">
        <NuxtLink to="/login">Log in</NuxtLink>
      </button>
      <button class="whitespace-nowrap uppercase">
        <NuxtLink to="/signup">Sign up</NuxtLink>
      </button>
      <div class="px-4 hidden sm:inline-block self-center">
        <User class="h-10"></User>
      </div>
    </template>
    <template v-else>
      <button>
        {{ user.name }}
      </button>
      <button>
        <a class="cursor-pointer whitespace-nowrap uppercase" @click="logout"
          >Log out</a
        >
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
.user-section {
  button {
    @apply px-4;
    &:hover {
      @apply bg-yellow-700;
    }
  }
}
</style>
