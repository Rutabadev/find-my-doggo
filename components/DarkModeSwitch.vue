<template>
  <button class="px-3 cursor-pointer" @click="toggleDarkMode">
    <svg width="60" height="32" aria-hidden="true">
      <rect
        x="6"
        y="2"
        width="48"
        height="28"
        rx="14"
        :fill="isDarkMode ? '#1f2937' : 'grey'"
      />
      <circle
        style="transition: all 150ms ease"
        :cx="isDarkMode ? 40 : 20"
        cy="16"
        r="11"
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
