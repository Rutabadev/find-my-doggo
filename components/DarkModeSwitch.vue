<template>
  <button class="dark-mode-switch px-4 cursor-pointer" @click="toggleDarkMode">
    <div
      class="rounded-full w-10 h-6 text-secondary-500 bg-gray-100 dark:text-blue-400 dark:bg-blue-900 transition shadow-inner ring-2 ring-gray-200 dark:ring-blue-900"
    >
      <div
        class="transition-transform transform-gpu bg-white dark:bg-gray-800 h-6 w-6 rounded-full shadow"
        :class="isDarkMode ? 'translate-x-4' : 'translate'"
      >
        <Moon v-if="isDarkMode"></Moon>
        <Sun v-else></Sun>
      </div>
    </div>
  </button>
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

  methods: {
    toggleDarkMode() {
      themeStore.setDarkMode(!themeStore.darkMode)
    },
  },
})
</script>

<style></style>
