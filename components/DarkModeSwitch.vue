<template>
  <button class="px-3 cursor-pointer" @click="toggleDarkMode">
    <svg
      class="h-7 w-14"
      width="42"
      height="24"
      viewBox="0 0 42 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width="42"
        height="24"
        rx="12"
        :fill="isDarkMode ? '#1f2937' : 'grey'"
      />
      <circle
        style="transition: all 150ms ease"
        :cx="isDarkMode ? 29 : 13"
        cy="12"
        r="10"
        fill="white"
      />
    </svg>
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
