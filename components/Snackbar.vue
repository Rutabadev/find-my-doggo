<template>
  <transition
    enter-active-class="transition duration-100 ease-out motion-reduce:transition-none"
    enter-class="transform translate-y-5 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-75 ease-in motion-reduce:transition-none"
    leave-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-5 opacity-0"
  >
    <div
      v-if="internalContent"
      class="fixed inset-0 px-1 pb-8 grid justify-center content-end pointer-events-none"
    >
      <div
        class="md:min-w-[37ch] max-w-2xl px-8 py-4 bg-white dark:bg-gray-900 rounded-md shadow-md flex items-center justify-between pointer-events-auto"
      >
        <p>{{ notification.message }}</p>
        <button class="ml-10" @click="close">
          <IconCross class="w-6 h-6" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { snackbarStore } from '~/store'

export default Vue.extend({
  data(): { timeout: any; internalContent: string } {
    return {
      timeout: undefined,
      internalContent: '',
    }
  },

  computed: {
    notification() {
      return snackbarStore.notification
    },
  },

  watch: {
    notification: {
      handler({ message, duration }) {
        clearTimeout(this.timeout)
        this.internalContent = message
        if (message) {
          this.timeout = setTimeout(this.close, duration)
        }
      },
    },
  },

  methods: {
    close() {
      this.internalContent = ''
      setTimeout(() => snackbarStore.showMessage({ message: '' }), 200)
    },
  },
})
</script>
