<template>
  <main>
    <div
      class="relative bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 transition min-h-screen"
    >
      <Navbar />
      <div class="container p-5 mx-auto">
        <Nuxt />
      </div>
      <IconSignature class="absolute bottom-0 right-0 p-8 w-52" />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    // Ping the backend to wake him up from sleep state in heroku
    this.$api.ping.get()
  },

  head() {
    return {
      ...this.$nuxtI18nSeo(),
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
