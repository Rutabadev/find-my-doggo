<template>
  <div class="bg-gray-50 min-h-screen">
    <nav class="h-20 bg-yellow-600 text-white flex items-center p-5 shadow-lg">
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
        <NuxtLink class="text-3xl" to="/">Find My Doggo</NuxtLink>
      </div>
      <div class="ml-auto flex items-center space-x-3">
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink to="/signup">Sign up</NuxtLink>
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
export default {}
</script>

<style>
button {
  @apply text-white;
  @apply bg-black;
  @apply border-2;
  @apply border-transparent;
  @apply rounded;
  @apply px-6;
  @apply py-1;
}

button:hover,
button:focus {
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
