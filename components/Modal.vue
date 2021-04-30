<template>
  <div>
    <div
      class="fixed z-10 inset-0 bg-black transition-opacity duration-200 motion-reduce:transition-none"
      :class="show ? 'opacity-50' : 'opacity-0 pointer-events-none'"
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
        class="fixed z-10 inset-0 grid place-content-center"
        @click="$emit('close')"
      >
        <div
          class="p-8 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col shadow-xl"
        >
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
