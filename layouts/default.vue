<template>
  <main>
    <div
      class="bg-gray-100 dark:bg-gray-800 dark:text-gray-300 transition min-h-screen"
    >
      <Navbar></Navbar>
      <div class="container p-5 mx-auto">
        <Nuxt></Nuxt>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  fetch() {
    // Ping the backend to wake him up from sleep state in heroku
    this.$axios.get('/')
  },
  head() {
    return this.$nuxtI18nSeo()
  },
})
</script>

<style></style>
