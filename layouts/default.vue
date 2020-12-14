<template>
  <main :class="{ dark: isDarkMode }">
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
import { themeStore } from '~/store'

export default Vue.extend({
  computed: {
    isDarkMode(): boolean {
      return themeStore.darkMode
    },
  },

  mounted() {
    const darkMode =
      localStorage['dark-mode'] ||
      (!('dark-mode' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    themeStore.setDarkModeWhithoutSaving(JSON.parse(darkMode))
  },
})
</script>

<style></style>
