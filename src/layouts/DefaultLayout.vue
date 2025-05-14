<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <main class="container mx-auto px-4 py-8 flex-grow">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "../components/common/AppHeader.vue";
</script>
