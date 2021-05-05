<template>
  <div
    class="max-w-sm mt-10 mx-auto rounded-lg bg-white dark:bg-gray-700 transition shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-12">{{ title }}</h1>
    <FormErrors :errors="errors"></FormErrors>
    <form class="grid gap-8" @submit.prevent="$emit('submit')">
      <slot></slot>
    </form>
    <div class="ml-auto mt-5 text-right">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    errors: {
      type: Array as PropType<string[]>,
      default: [],
    },
  },
})
</script>
