<template>
  <div>
    <div
      class="absolute inset-0 h-screen bg-black motion-safe:duration-500 z-10"
      :class="[show ? 'opacity-50' : 'opacity-0 pointer-events-none']"
      @click="toggleSidebar"
    ></div>
    <div
      class="absolute inset-0 w-2/3 max-w-xs motion-safe:duration-200 z-10"
      :class="show ? 'visible' : 'invisible'"
      :style="{
        transform: show ? 'translate3d(0, 0, 0)' : 'translate3d(-102%, 0, 0)',
        'will-change': 'transform',
      }"
    >
      <div class="relative w-full h-screen">
        <svg
          viewBox="0 0 214 720"
          class="sidebar-svg absolute z-[-1] text-primary-600 w-full h-full"
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
            ref="closeSideBarButton"
            aria-label="close sidebar"
            class="h-16 px-4 hover:bg-primary-700 focus:bg-primary-700 text-gray-50"
            @click="toggleSidebar"
          >
            <IconCross class="h-8"></IconCross>
          </button>
          <DarkModeSwitch
            :class="`transform-gpu ${
              show ? 'motion-safe:duration-500' : '-translate-x-full'
            }`"
          />
        </div>
        <ProgressiveItems
          :show="show"
          class="flex flex-col text-lg uppercase text-gray-100 text-center"
        >
          <template v-for="link of links">
            <template
              v-if="
                (link.user &&
                  $auth.user &&
                  (!link.roles
                    ? true
                    : $auth.user.roles.some((role) =>
                        link.roles.includes(role)
                      ))) ||
                (!link.user && !$auth.user) ||
                link.always
              "
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
import { sidebarStore } from '~/store'

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
      roles?: string[]
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
          route: '/admin',
          name: 'admin.title',
          user: true,
          roles: ['admin'],
        },
        {
          name: 'logout',
          user: true,
        },
      ],
    }
  },

  watch: {
    show(show: boolean): void {
      const targets = document.querySelector('#wave')
      const paths = {
        closed:
          'M0 0H214.023C234.5 203 218.5 350 214 502.5C215.5 623 218 692 214.5 720H0V0Z',
        opened:
          'M-3 0H153C305.5 150.5 130.5 346.5 62 493C7.19999 610.2 101.833 692.667 156 720H-3V0Z',
      }
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches
      const easing = reduceMotion ? 'steps(1)' : 'spring(1, 80, 20, 0)'
      if (show) {
        setTimeout(() => {
          ;(this.$refs.closeSideBarButton as HTMLElement).focus()
        }, 100)

        anime({
          targets,
          d: [
            {
              value: paths.closed,
            },
          ],
          easing,
        })
      } else {
        anime({
          targets,
          d: [
            {
              value: paths[reduceMotion ? 'closed' : 'opened'],
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

  head() {
    return sidebarStore.open
      ? {
          bodyAttrs: {
            class: 'overflow-y-hidden',
          },
        }
      : {}
  },
})
</script>

<style scoped>
.sidebar-svg {
  filter: drop-shadow(0 0 4px hsla(0, 0%, 10%, 0.5));
}
</style>
