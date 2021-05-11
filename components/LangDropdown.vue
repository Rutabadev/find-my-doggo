<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        ref="dropdownButton"
        class="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50"
        @click="langDropdownOpen = !langDropdownOpen"
      >
        {{ $i18n.locale }}
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-y-90"
      enter-to-class="transform opacity-100 scale-y-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-y-100"
      leave-to-class="transform opacity-0 scale-y-90"
    >
      <div
        v-show="langDropdownOpen"
        class="origin-top-right absolute left-0 right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
      >
        <div ref="menuItemsContainer" class="py-1">
          <a
            v-for="locale in availableLocales"
            :key="locale"
            class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 cursor-pointer"
            href="#"
            @click="linkClick(locale)"
            >{{ locale }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data(): {
    langDropdownOpen: boolean
    selectedItem: undefined | number
  } {
    return {
      langDropdownOpen: false,
      selectedItem: undefined,
    }
  },

  computed: {
    availableLocales(): string[] {
      return (this.$i18n.locales as { code: string }[])
        .filter((locale) => locale.code !== this.$i18n.locale)
        .map(({ code }) => code)
    },
  },

  watch: {
    langDropdownOpen(langDropdownOpen: boolean) {
      if (langDropdownOpen) {
        window.addEventListener('keydown', this.downHandler)
        window.addEventListener('keydown', this.upHandler)
        window.addEventListener('keydown', this.spaceHandler)
        window.addEventListener('click', this.outsideClickHandler)
      } else {
        window.removeEventListener('keydown', this.downHandler)
        window.removeEventListener('keydown', this.upHandler)
        window.removeEventListener('keydown', this.upHandler)
        window.removeEventListener('click', this.outsideClickHandler)
      }
    },
  },

  methods: {
    linkClick(localeCode: string) {
      this.langDropdownOpen = !this.langDropdownOpen
      this.$i18n.setLocale(localeCode)
      ;(this.$refs.dropdownButton as HTMLElement).focus()
    },

    downHandler({ code }: KeyboardEvent) {
      if (code === 'ArrowDown') {
        this.selectedItem =
          this.selectedItem !== undefined
            ? Math.min(
                this.selectedItem + 1,
                (this.$refs.menuItemsContainer as HTMLElement)
                  .childElementCount - 1
              )
            : 0
        ;((this.$refs.menuItemsContainer as HTMLElement).children[
          this.selectedItem
        ] as HTMLElement).focus()
      }
    },

    upHandler({ code }: KeyboardEvent) {
      if (code === 'ArrowUp') {
        this.selectedItem =
          this.selectedItem !== undefined
            ? Math.max(this.selectedItem - 1, 0)
            : (this.$refs.menuItemsContainer as HTMLElement).childElementCount -
              1
        ;((this.$refs.menuItemsContainer as HTMLElement).children[
          this.selectedItem
        ] as HTMLElement).focus()
      }
    },

    spaceHandler(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault()
        this.langDropdownOpen = false
        ;(this.$refs.dropdownButton as HTMLElement).focus()
      }
    },

    outsideClickHandler({ target }: MouseEvent) {
      if (
        !(this.$refs.dropdownButton as HTMLElement).contains(target as Node)
      ) {
        this.langDropdownOpen = false
      }
    },
  },
})
</script>
