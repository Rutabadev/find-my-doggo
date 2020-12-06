<template>
  <div class="bg-gray-50 min-h-screen">
    <nav
      class="bg-yellow-600 text-white flex justify-between items-center px-1 md:px-5 py-2 shadow-lg"
    >
      <svg
        class="h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
      <div class="flex items-center space-x-2">
        <svg
          class="h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <NuxtLink class="text-3xl whitespace-nowrap" to="/"
          >Find My Doggo</NuxtLink
        >
      </div>
      <div class="flex items-center space-x-3">
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
    </nav>
    <div class="container p-5">
      <Nuxt></Nuxt>
    </div>
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

<style>
:root {
  --slide-distance: 30px;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
}

.button {
  @apply text-white;
  @apply bg-black;
  @apply border-2;
  @apply border-transparent;
  @apply rounded;
  @apply px-6;
  @apply py-1;
}

.button:hover,
.button:focus {
  @apply border-black;
  @apply text-black;
  @apply bg-white;
}

input {
  @apply rounded;
  @apply border-2;
  @apply p-2;
  @apply mt-1;
  @apply mb-3;
}
</style>
