<template>
  <div>
    <nav class="grid grid-cols-3 bg-primary-600 text-gray-50 h-16 shadow-lg">
      <div class="flex items-center space-x-4">
        <button
          ref="openSideBarButton"
          aria-label="toggle sidebar"
          class="px-4 md:hidden hover:bg-primary-700 h-full"
          @click="toggleSidebar"
        >
          <IconBurgerMenu class="h-8"></IconBurgerMenu>
        </button>
        <LangDropdown class="hidden md:block"></LangDropdown>
        <DarkModeSwitch class="hidden md:block h-full"></DarkModeSwitch>
      </div>
      <IconTitle class="place-self-center" />
      <UserSection class="place-self-end" />
    </nav>
    <Sidebar :show="showSidebar" @onToggleSidebar="toggleSidebar"></Sidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { sidebarStore } from '~/store'

export default Vue.extend({
  data() {
    return {
      showSidebar: false,
    }
  },

  methods: {
    toggleSidebar() {
      const nextShowSidebar = !this.showSidebar
      sidebarStore.setOpen(nextShowSidebar)
      this.showSidebar = nextShowSidebar
      if (!nextShowSidebar) {
        ;(this.$refs.openSideBarButton as HTMLElement).focus()
      }
    },
  },
})
</script>
