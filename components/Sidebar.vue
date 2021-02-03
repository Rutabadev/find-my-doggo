<template>
  <div>
    <div
      class="absolute inset-0 bg-black duration-500 z-10"
      :class="[show ? 'opacity-50' : 'opacity-0 pointer-events-none']"
      @click="toggleSidebar"
    ></div>
    <div
      class="absolute left-0 top-0 bottom-0 w-2/3 max-w-md duration-200 z-10"
      :class="show ? 'visible' : 'invisible'"
      :style="
        show
          ? 'transform: translate3d(0, 0, 0)'
          : 'transform: translate3d(-102%, 0, 0)'
      "
    >
      <div class="relative w-full h-full">
        <svg
          viewBox="0 0 214 720"
          class="sidebar-svg absolute text-primary-600"
          height="100%"
          width="100%"
          fill="currentColor"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="wave"
            d="M-3 0H153C305.5 150.5 130.5 346.5 62 493C7.19999 610.2 101.833 692.667 156 720H-3V0Z"
          />
        </svg>
        <div class="flex justify-between">
          <button
            aria-label="close sidebar"
            class="h-16 px-4 hover:bg-primary-700 focus:bg-primary-700 text-gray-50"
            @click="toggleSidebar"
          >
            <Cross class="h-8"></Cross>
          </button>
          <DarkModeSwitch
            :class="`md:hidden transform-gpu ${
              show ? 'duration-500' : '-translate-x-full'
            } transition-transform`"
          />
        </div>
        <ProgressiveItems
          :show="show"
          class="flex flex-col text-lg uppercase text-gray-100 text-center"
        >
          <template v-for="link of links">
            <template
              v-if="(link.user && user) || (!link.user && !user) || link.always"
            >
              <NuxtLink
                v-if="link.route"
                :key="link.name"
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
                class="hover:bg-primary-700 focus:bg-primary-700 py-4 cursor-pointer uppercase"
                @click="logout"
              >
                {{ $t(link.name) }}
              </button>
            </template>
          </template>
          <div class="py-4">
            <LangDropdown class="normal-case" />
          </div>
        </ProgressiveItems>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import anime from 'animejs'

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

  watch: {
    show(show: boolean): void {
      const targets = document.querySelector('#wave')
      const easing = 'spring(1, 80, 20, 0)'
      if (show) {
        anime({
          targets,
          d: [
            {
              value:
                'M0 0H214.023C234.5 203 218.5 350 214 502.5C215.5 623 218 692 214.5 720H0V0Z',
            },
          ],
          easing,
        })
      } else {
        anime({
          targets,
          d: [
            {
              value:
                'M-3 0H153C305.5 150.5 130.5 346.5 62 493C7.19999 610.2 101.833 692.667 156 720H-3V0Z',
            },
          ],
          easing,
        })
      }
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

<style lang="scss" scoped>
.sidebar-svg {
  z-index: -1;
  filter: drop-shadow(0 0 4px hsla(0, 0%, 10%, 0.5));
}
</style>
