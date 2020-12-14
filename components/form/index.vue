<template>
  <div
    class="max-w-sm mt-10 mx-auto rounded-lg bg-white dark:bg-gray-700 transition shadow-md p-5 flex flex-col"
  >
    <h1 class="text-2xl text-center mb-6">{{ title }}</h1>
    <FormErrors
      :errors="errors.filter((e) => e.field === 'global')"
    ></FormErrors>
    <form class="flex flex-col" @submit.prevent="$emit('submit')">
      <slot></slot>
    </form>
    <p class="ml-auto mt-5">
      <slot name="bottom"></slot>
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { FormError } from '~/types'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    errors: {
      type: Array as PropType<FormError[]>,
      default: [],
    },
  },
})
</script>

<style></style>
