<template>
  <button class="dark-mode-switch px-3 cursor-pointer" @click="toggleDarkMode">
    <div
      class="rounded-full w-9 h-6 text-secondary-500 bg-gray-50 dark:text-blue-400 dark:bg-gray-800 transition relative"
    >
      <div
        class="absolute transition-transform transform-gpu"
        :class="isDarkMode ? 'translate-x-1/2' : 'translate'"
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
