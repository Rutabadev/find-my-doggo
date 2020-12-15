<template>
  <button
    class="px-4 cursor-pointer"
    @click="toggleDarkMode"
    @contextmenu.prevent="resetPreference"
  >
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
export default Vue.extend({
  computed: {
    isDarkMode(): boolean {
      return this.$colorMode.value === 'dark'
    },
  },

  methods: {
    toggleDarkMode(): void {
      if (this.$colorMode.value === 'dark') {
        this.$colorMode.preference = 'light'
      } else {
        this.$colorMode.preference = 'dark'
      }
    },

    resetPreference(): void {
      const wantToReset = confirm(
        'Do you want to reset your theme based on system preference ?'
      )
      if (wantToReset) {
        this.$colorMode.preference = 'system'
      }
    },
  },
})
</script>

<style></style>
