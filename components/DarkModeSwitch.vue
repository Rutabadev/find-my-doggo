<template>
  <button
    aria-label="toggle dark mode"
    class="px-4 cursor-pointer"
    @click="toggleDarkMode"
    @click.right.prevent="resetPreference"
  >
    <div
      class="
        rounded-full
        w-10
        h-6
        text-secondary-500
        bg-gray-100
        dark:bg-gray-800
        transition
        shadow-inner
        ring-2 ring-gray-300
        dark:ring-gray-700
      "
    >
      <div
        class="
          h-6
          w-6
          bg-white
          dark:bg-gray-600
          rounded-full
          shadow
          transform-gpu
          transition-transform
        "
        :class="isDarkMode ? 'translate-x-4 rotate-0' : 'translate -rotate-180'"
      >
        <IconMoon v-if="isDarkMode"></IconMoon>

        <IconSun v-else></IconSun>
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
      const wantToReset = confirm(this.$i18n.t('dark_mode_reset').toString())

      if (wantToReset) {
        this.$colorMode.preference = 'system'
      }
    },
  },

  head() {
    return this.$colorMode.value === 'dark'
      ? {
          meta: [
            {
              hid: 'color-scheme',

              name: 'color-scheme',

              content: 'dark light',
            },
          ],
        }
      : {}
  },
})
</script>
