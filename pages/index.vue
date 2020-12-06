<template>
  <div>
    <h1 class="text-xl text-center mb-8">This is the landing page</h1>
    <NuxtLink to="/protected" class="text-blue-600 hover:underline"
      >Go to a protected page</NuxtLink
    >
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>

<style></style>
