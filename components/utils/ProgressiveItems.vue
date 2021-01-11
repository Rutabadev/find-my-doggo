<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const classes = ['-translate-x-80', 'duration-300']

export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    show() {
      this.$children.forEach((child) => {
        const element = child.$el as HTMLElement
        classes.forEach((className) => element.classList.toggle(className))
      })
    },
  },

  mounted() {
    this.$children.forEach((child, index) => {
      const element = child.$el as HTMLElement
      element.style.transitionDelay = `${++index * 100}ms`
      element.classList.add(
        'transform-gpu',
        '-translate-x-80',
        'transition-transform',
        'ease-out'
      )
    })
  },
})
</script>
