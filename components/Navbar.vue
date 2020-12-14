<template>
  <div class="navbar">
    <nav
      class="relative bg-primary-600 text-white flex justify-between h-16 shadow-lg"
    >
      <div class="flex items-center space-x-4">
        <button
          id="toggle-sidebar"
          class="px-4 md:hidden hover:bg-primary-700 h-full"
          @click="toggleSidebar"
        >
          <BurgerMenu class="h-8"></BurgerMenu>
        </button>
        <LangDropdown class="hidden md:block"></LangDropdown>
        <DarkModeSwitch
          id="dark-mode-switch-desktop"
          class="hidden md:block h-full"
        ></DarkModeSwitch>
      </div>
      <Title
        class="absolute inset-y-0 left-1/2 transform-gpu -translate-x-1/2"
      ></Title>
      <UserSection></UserSection>
    </nav>
    <Sidebar :show="showSidebar" @onToggleSidebar="toggleSidebar"></Sidebar>
  </div>
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

  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
  },
})
</script>

<style></style>
