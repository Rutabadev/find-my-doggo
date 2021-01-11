<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const defaultClasses = [
  'transform-gpu',
  'transition-transform',
  'ease-out',
  'duration-200',
]

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  data(): {
    observer: undefined | MutationObserver
  } {
    return {
      observer: undefined,
    }
  },

  watch: {
    show() {
      this.setupAnimations()
    },
  },

  mounted() {
    this.setupAnimations()
    this.observer = new MutationObserver(this.setupAnimations)
    this.observer.observe(this.$el, { childList: true })
  },

  beforeDestroy() {
    this.observer?.disconnect()
  },

  methods: {
    setupAnimations(): void {
      Array.from(this.$el.children).forEach((child, index) => {
        const element = child as HTMLElement
        if (this.show) {
          element.classList.remove('-translate-x-full')
          element.classList.add(...defaultClasses)
          element.classList.add('translate-x-0')
        } else {
          element.style.transitionDelay = `${++index * 100}ms`
          element.classList.remove('translate-x-0')
          element.classList.add(...defaultClasses)
          element.classList.add('-translate-x-full')
        }
      })
    },
  },
})
</script>
