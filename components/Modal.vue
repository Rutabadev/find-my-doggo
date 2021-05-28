<template>
  <div>
    <div
      class="
        fixed
        z-10
        inset-0
        bg-black
        transition-opacity
        duration-200
        motion-reduce:transition-none
        overscroll-y-contain
      "
      :class="show ? 'opacity-50' : 'opacity-0 pointer-events-none'"
      @click="$emit('close')"
    />
    <transition
      enter-active-class="transition duration-100 ease-out motion-reduce:transition-none"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in motion-reduce:transition-none"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="show"
        class="
          fixed
          z-10
          left-1/2
          top-1/2
          transform-gpu
          -translate-x-1/2 -translate-y-1/2
          grid
          place-content-center
        "
      >
        <FocusTrap :active="show" :initial-focus="initialFocus">
          <div
            class="
              p-8
              bg-gray-50
              dark:bg-gray-700
              rounded-lg
              flex flex-col
              shadow-xl
            "
            tabindex="-1"
          >
            <slot />
          </div>
        </FocusTrap>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FocusTrap } from 'focus-trap-vue'

export default Vue.extend({
  components: {
    FocusTrap,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    initialFocus: {
      type: Function,
      default: undefined,
    },
  },

  watch: {
    show(show: boolean) {
      if (show) {
        window.addEventListener('keydown', this.closeKeyListener)
      } else {
        window.removeEventListener('keydown', this.closeKeyListener)
      }
    },
  },

  methods: {
    closeKeyListener(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        this.$emit('close')
      }
    },
  },
})
</script>
