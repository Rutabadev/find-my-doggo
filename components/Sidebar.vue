<template>
  <div>
    <div
      class="absolute inset-0 bg-black duration-500 z-10"
      :class="[show ? 'opacity-50' : 'opacity-0 pointer-events-none']"
      @click="toggleSidebar"
    ></div>
    <ul
      class="absolute left-0 top-0 bottom-0 w-2/3 max-w-md bg-yellow-600 shadow-lg flex flex-col text-lg uppercase text-gray-100 text-center transform-gpu duration-200 z-10"
      :class="{ '-translate-x-full': !show }"
    >
      <button
        class="h-16 px-4 hover:bg-yellow-700 self-start"
        @click="toggleSidebar"
      >
        <Cross class="h-8"></Cross>
      </button>
      <NuxtLink
        to="/"
        class="hover:bg-yellow-700 py-4"
        @click.native="toggleSidebar"
        >Home</NuxtLink
      >
      <NuxtLink
        to="/login"
        class="hover:bg-yellow-700 py-4"
        @click.native="toggleSidebar"
        >Log in</NuxtLink
      >
      <NuxtLink
        to="/signup"
        class="hover:bg-yellow-700 py-4"
        @click.native="toggleSidebar"
        >Sign up</NuxtLink
      >
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },

  methods: {
    toggleSidebar() {
      this.$emit('onToggleSidebar')
    },
  },
}
</script>

<style></style>