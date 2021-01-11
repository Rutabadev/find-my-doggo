<template>
  <div>
    <nav
      class="relative bg-primary-600 text-gray-50 flex justify-between h-16 shadow-lg"
    >
      <div class="flex items-center space-x-4">
        <button
          aria-label="toggle sidebar"
          class="px-4 md:hidden hover:bg-primary-700 h-full"
          @click="toggleSidebar"
        >
          <BurgerMenu class="h-8"></BurgerMenu>
        </button>
        <LangDropdown class="hidden md:block"></LangDropdown>
        <DarkModeSwitch class="hidden md:block h-full"></DarkModeSwitch>
      </div>
      <Title
        class="absolute inset-y-0 left-1/2 transform-gpu -translate-x-1/2"
      />
      <UserSection />
    </nav>
    <Sidebar :show="showSidebar" @onToggleSidebar="toggleSidebar"></Sidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      showSidebar: false,
    }
  },

  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
  },
})
</script>
