<template>
  <main
    class="
      min-h-screen
      bg-gray-100
      dark:bg-gray-800
      flex flex-col
      text-gray-800
      dark:text-gray-300
      motion-safe:transition-colors
    "
  >
    <Navbar />
    <div class="container p-5 mx-auto">
      <Nuxt />
    </div>
    <div class="flex-grow grid place-content-end">
      <IconSignature class="p-8 w-52" />
    </div>
    <Snackbar />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    // Ping the backend to wake him up from sleep state in Heroku
    this.$api.ping.get()
  },

  head() {
    return {
      ...this.$nuxtI18nHead(),
      link: [
        {
          rel: 'canonical',
          href: 'https://find-doggo.herokuapp.com' + this.$route.path,
        },
      ],
    }
  },
})
</script>
