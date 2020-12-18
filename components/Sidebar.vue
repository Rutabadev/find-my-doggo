<template>
  <div>
    <div
      class="absolute inset-0 bg-black duration-500 z-10"
      :class="[show ? 'opacity-50' : 'opacity-0 pointer-events-none']"
      @click="toggleSidebar"
    ></div>
    <ul
      class="absolute left-0 top-0 bottom-0 w-2/3 max-w-md bg-primary-600 shadow-lg flex flex-col text-lg uppercase text-gray-100 text-center duration-200 z-10"
      :style="
        show
          ? 'transform: translate3d(0, 0, 0)'
          : 'transform: translate3d(-102%, 0, 0)'
      "
    >
      <div class="flex justify-between">
        <button
          id="close-sidebar"
          aria-label="close sidebar"
          class="h-16 px-4 hover:bg-primary-700 focus:bg-primary-700"
          :tabindex="!show ? '-1' : ''"
          @click="toggleSidebar"
        >
          <Cross class="h-8"></Cross>
        </button>
        <DarkModeSwitch
          id="dark-mode-switch-mobile"
          class="md:hidden"
          :tabindex="!show ? '-1' : ''"
        ></DarkModeSwitch>
      </div>
      <template v-for="link of links">
        <template
          v-if="(link.user && user) || (!link.user && !user) || link.always"
        >
          <NuxtLink
            v-if="link.route"
            :key="link.name"
            :tabindex="!show ? '-1' : ''"
            class="hover:bg-primary-700 focus:bg-primary-700 py-4 uppercase"
            :to="link.route"
            @click.native="toggleSidebar"
          >
            {{ $t(link.name) }}
            <Notification v-if="isRouteActive(link.route)"></Notification>
          </NuxtLink>
          <button
            v-else
            :key="link.name"
            aria-label="log out"
            :tabindex="!show ? '-1' : ''"
            class="hover:bg-primary-700 focus:bg-primary-700 py-4 cursor-pointer uppercase"
            @click="logout"
          >
            {{ $t(link.name) }}
          </button>
        </template>
      </template>
      <LangDropdown
        :tabindex="!show ? '-1' : ''"
        class="self-center normal-case"
      ></LangDropdown>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  data(): {
    links: {
      route?: string
      name: string
      user?: boolean
      always?: boolean
    }[]
  } {
    return {
      links: [
        {
          route: '/',
          name: 'index.title',
          always: true,
        },
        {
          route: '/login',
          name: 'login.title',
          user: false,
        },
        {
          route: '/signup',
          name: 'signup.title',
          user: false,
        },
        {
          name: 'logout',
          user: true,
        },
      ],
    }
  },

  computed: {
    user(): any {
      return this.$auth.user
    },
  },

  methods: {
    isRouteActive(route: string): boolean {
      return this.$route.path === route
    },

    toggleSidebar() {
      this.$emit('onToggleSidebar')
    },

    logout() {
      this.$auth.logout()
      this.toggleSidebar()
    },
  },
})
</script>

<style></style>
