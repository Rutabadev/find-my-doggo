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
      v-show="internalContent"
      class="fixed inset-0 px-1 pb-8 grid justify-center content-end pointer-events-none"
    >
      <div
        class="max-w-2xl px-8 py-4 bg-white dark:bg-gray-900 rounded-md shadow-md flex items-center space-between pointer-events-auto"
      >
        <p>{{ content }}</p>
        <button class="ml-10 button px-2 py-1" @click="close">Close</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { snackbarStore } from '~/store'

export default Vue.extend({
  data() {
    return {
      internalContent: '',
    }
  },

  computed: {
    content() {
      return snackbarStore.content
    },
  },

  watch: {
    content: {
      handler(newValue) {
        this.internalContent = newValue
      },
    },
  },

  methods: {
    close() {
      this.internalContent = ''
      setTimeout(() => snackbarStore.showMessage(''), 200)
    },
  },
})
</script>
