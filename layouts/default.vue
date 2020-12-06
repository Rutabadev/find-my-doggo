<template>
  <div class="bg-gray-50 min-h-screen">
    <nav
      class="relative bg-yellow-600 text-white flex justify-between items-center px-1 sm:px-5 py-2 shadow-lg"
    >
      <Title
        class="absolute inset-y-0 left-1/2 transform-gpu -translate-x-1/2"
      ></Title>
      <BurgerMenu></BurgerMenu>
      <UserSection></UserSection>
    </nav>
    <div class="container p-5 mx-auto">
      <Nuxt></Nuxt>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
:root {
  --slide-distance: 30px;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(var(--slide-distance), 0, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(calc(var(--slide-distance) * -1), 0, 0);
}

.button {
  @apply text-white;
  @apply bg-black;
  @apply border-2;
  @apply border-transparent;
  @apply rounded;
  @apply px-6;
  @apply py-1;
}

.button:hover,
.button:focus {
  @apply border-black;
  @apply text-black;
  @apply bg-white;
}

input {
  @apply rounded;
  @apply border-2;
  @apply p-2;
  @apply mt-1;
  @apply mb-3;
}
</style>
