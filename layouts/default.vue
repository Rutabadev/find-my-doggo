<template>
  <main :class="{ dark: isDarkMode }">
    <div class="bg-gray-50 dark:bg-gray-800 transition min-h-screen">
      <nav
        class="relative bg-primary-600 text-white flex justify-between h-16 shadow-lg"
      >
        <button
          class="px-4 md:hidden hover:bg-primary-700"
          @click="toggleSidebar"
        >
          <BurgerMenu class="h-8"></BurgerMenu>
        </button>
        <Title
          class="absolute inset-y-0 left-1/2 transform-gpu -translate-x-1/2"
        ></Title>
        <DarkModeSwitch class="hidden md:block ml-auto"></DarkModeSwitch>
        <UserSection></UserSection>
      </nav>
      <Sidebar :show="showSidebar" @onToggleSidebar="toggleSidebar"></Sidebar>
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
  data() {
    return {
      showSidebar: false,
    }
  },

  computed: {
    isDarkMode(): boolean {
      return themeStore.darkMode
    },
  },

  mounted() {
    themeStore.setDarkMode(
      JSON.parse(localStorage.getItem('dark-mode') || 'false')
    )
  },

  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
  },
})
</script>

<style lang="scss">
:root {
  --slide-distance: 30px;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
}

.button {
  @apply text-white;
  @apply bg-black;
  @apply border-2;
  @apply border-transparent;
  @apply rounded;
  @apply px-6;
  @apply py-1;
}

.button:hover,
.button:focus {
  @apply border-black;
  @apply text-black;
  @apply bg-white;
}

input {
  @apply rounded;
  @apply border-2;
  @apply p-2;
  @apply transition;
}

.dark {
  input {
    @apply bg-gray-600;
    @apply border-gray-800;
  }
}

.field {
  @apply relative;
  @apply mt-4;
  @apply mb-6;

  input {
    @apply block;
    @apply w-full;
  }

  label {
    @apply absolute;
    top: 2px;
    @apply p-2;
    @apply text-gray-400;
    @apply pointer-events-none;
    @apply duration-200;
  }

  input:focus-within ~ label,
  input:not(:placeholder-shown) ~ label {
    @apply top-0;
    @apply -left-1;
    @apply p-0;
    @apply transform;
    @apply scale-90;
    @apply -translate-y-6;
  }
}
</style>
