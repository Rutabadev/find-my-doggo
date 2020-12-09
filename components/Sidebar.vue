<template>
  <div>
    <div
      class="absolute inset-0 bg-black duration-500 z-10"
      :class="[show ? 'opacity-50' : 'opacity-0 pointer-events-none']"
      @click="toggleSidebar"
    ></div>
    <ul
      class="absolute left-0 top-0 bottom-0 w-2/3 max-w-md bg-yellow-600 shadow-lg flex flex-col text-lg uppercase text-gray-100 text-center transform-gpu duration-200 z-10"
      :class="{ '-translate-x-full': !show }"
    >
      <button
        class="h-16 px-4 hover:bg-yellow-700 focus:bg-yellow-700 self-start"
        :tabindex="!show ? '-1' : ''"
        @click="toggleSidebar"
      >
        <Cross class="h-8"></Cross>
      </button>
      <template v-for="link of links">
        <template
          v-if="(link.user && user) || (!link.user && !user) || link.always"
        >
          <NuxtLink
            v-if="link.route"
            :key="link.name"
            :tabindex="!show ? '-1' : ''"
            class="hover:bg-yellow-700 focus:bg-yellow-700 py-4 uppercase"
            :to="link.route"
            @click.native="toggleSidebar"
          >
            <span>
              {{ link.name }}
            </span>
            <Notification v-if="isRouteActive(link.route)"></Notification>
          </NuxtLink>
          <button
            v-else
            :key="link.name"
            :tabindex="!show ? '-1' : ''"
            class="hover:bg-yellow-700 focus:bg-yellow-700 py-4 cursor-pointer uppercase"
            @click="logout"
          >
            {{ link.name }}
          </button>
        </template>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    show: Boolean,
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
          name: 'home',
          always: true,
        },
        {
          route: '/login',
          name: 'log in',
          user: false,
        },
        {
          route: '/signup',
          name: 'sign up',
          user: false,
        },
        {
          name: 'log out',
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
