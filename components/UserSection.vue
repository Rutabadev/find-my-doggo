<template>
  <div class="hidden sm:flex items-center space-x-3">
    <template v-if="!user">
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink class="whitespace-nowrap" to="/signup">Sign up</NuxtLink>
    </template>
    <template v-else>
      <span>{{ user.name }}</span>
      <a class="cursor-pointer whitespace-nowrap" @click="logout">Logout</a>
    </template>
    <svg
      class="h-10 hidden sm:block"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
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

<style></style>
